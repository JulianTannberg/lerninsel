-- Lerninsel v9.0 – mehrere Klassen, dauerhafte Inhaltsbibliothek und Elternzugänge
-- Dieses Skript NACH den bisherigen Lerninsel-SQL-Dateien einmal ausführen.
-- Bestehende Räume, Schüler, Inhalte und Lernstände bleiben erhalten.

begin;

create table if not exists public.li_library_items (
  library_id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  item jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_user_id, item_id)
);

create table if not exists public.li_library_room_links (
  library_id uuid not null references public.li_library_items(library_id) on delete cascade,
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  active boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (library_id, room_id)
);

alter table public.li_parent_codes
  add column if not exists label text not null default 'Eltern';

create index if not exists li_library_items_owner_idx
  on public.li_library_items(owner_user_id, updated_at desc);
create index if not exists li_library_room_links_room_idx
  on public.li_library_room_links(room_id, active);

alter table public.li_library_items enable row level security;
alter table public.li_library_room_links enable row level security;
revoke all on public.li_library_items from anon, authenticated;
revoke all on public.li_library_room_links from anon, authenticated;

-- Vorhandene Inhalte einmalig in die persönliche Bibliothek übernehmen.
insert into public.li_library_items(owner_user_id, item_id, item, created_at, updated_at)
select x.created_by, x.item_id, x.item, now(), x.updated_at
from (
  select distinct on (r.created_by, i.item_id)
    r.created_by, i.item_id, i.item, i.updated_at
  from public.li_items i
  join public.li_rooms r on r.id = i.room_id
  order by r.created_by, i.item_id, i.updated_at desc
) x
on conflict (owner_user_id, item_id) do nothing;

insert into public.li_library_room_links(library_id, room_id, active, updated_at)
select l.library_id, i.room_id, true, now()
from public.li_items i
join public.li_rooms r on r.id = i.room_id
join public.li_library_items l
  on l.owner_user_id = r.created_by and l.item_id = i.item_id
on conflict (library_id, room_id) do update
set active = true, updated_at = now();

create or replace function public.lerninsel_teacher_library_get()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;

  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'libraryId', l.library_id,
      'item', l.item,
      'roomIds', coalesce((
        select jsonb_agg(x.room_id order by x.room_id)
        from public.li_library_room_links x
        where x.library_id = l.library_id and x.active = true
      ), '[]'::jsonb),
      'updatedAt', l.updated_at
    ) order by l.updated_at desc, l.item_id)
    from public.li_library_items l
    where l.owner_user_id = auth.uid()
  ), '[]'::jsonb);
end;
$$;

create or replace function public.lerninsel_teacher_library_upsert(
  p_item jsonb,
  p_room_ids uuid[]
) returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_library_id uuid;
  v_item_id text;
  v_room_id uuid;
  v_rooms uuid[] := coalesce(p_room_ids, array[]::uuid[]);
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  v_item_id := trim(coalesce(p_item->>'id',''));
  if v_item_id = '' then raise exception 'item id missing'; end if;

  foreach v_room_id in array v_rooms loop
    if not public.li_is_teacher(v_room_id) then raise exception 'forbidden room'; end if;
  end loop;

  insert into public.li_library_items(owner_user_id, item_id, item, updated_at)
  values (auth.uid(), v_item_id, p_item, now())
  on conflict (owner_user_id, item_id) do update
    set item = excluded.item, updated_at = now()
  returning library_id into v_library_id;

  delete from public.li_library_room_links x
  where x.library_id = v_library_id
    and not (x.room_id = any(v_rooms));

  foreach v_room_id in array v_rooms loop
    insert into public.li_library_room_links(library_id, room_id, active, updated_at)
    values (v_library_id, v_room_id, true, now())
    on conflict (library_id, room_id) do update
      set active = true, updated_at = now();

    insert into public.li_items(room_id, item_id, item, updated_at)
    values (v_room_id, v_item_id, p_item, now())
    on conflict (room_id, item_id) do update
      set item = excluded.item, updated_at = now();

    insert into public.li_assignments(room_id, student_id, item_id)
    select v_room_id, s.id, v_item_id
    from public.li_students s
    where s.room_id = v_room_id
    on conflict do nothing;
  end loop;

  -- Abwählen blendet nur aus. Inhalte und Lernstände werden nicht gelöscht.
  delete from public.li_assignments a
  where a.item_id = v_item_id
    and exists (
      select 1 from public.li_room_members m
      where m.room_id = a.room_id and m.user_id = auth.uid() and m.role = 'teacher'
    )
    and not (a.room_id = any(v_rooms));

  return v_library_id;
end;
$$;

create or replace function public.lerninsel_teacher_library_seed(
  p_items jsonb,
  p_room_id uuid
) returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_item jsonb;
  v_item_id text;
  v_library_id uuid;
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;

  for v_item in select * from jsonb_array_elements(coalesce(p_items,'[]'::jsonb)) loop
    v_item_id := trim(coalesce(v_item->>'id',''));
    if v_item_id <> '' then
      insert into public.li_library_items(owner_user_id, item_id, item, updated_at)
      values (auth.uid(), v_item_id, v_item, now())
      on conflict (owner_user_id, item_id) do update
        set item = excluded.item, updated_at = now()
      returning library_id into v_library_id;

      insert into public.li_library_room_links(library_id, room_id, active, updated_at)
      values (v_library_id, p_room_id, true, now())
      on conflict (library_id, room_id) do update set active=true, updated_at=now();

      insert into public.li_items(room_id, item_id, item, updated_at)
      values (p_room_id, v_item_id, v_item, now())
      on conflict (room_id, item_id) do update set item=excluded.item, updated_at=now();

      insert into public.li_assignments(room_id, student_id, item_id)
      select p_room_id, s.id, v_item_id from public.li_students s where s.room_id=p_room_id
      on conflict do nothing;
    end if;
  end loop;
end;
$$;

-- Neue Schüler erhalten automatisch alle aktuell für ihre Klasse aktivierten Inhalte.
create or replace function public.lerninsel_teacher_upsert_student(
  p_room_id uuid,
  p_student_id uuid,
  p_label text,
  p_student_code text
) returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare sid uuid;
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if length(trim(p_student_code)) < 4 then raise exception 'student code too short'; end if;
  if trim(coalesce(p_label,'')) = '' then raise exception 'student label missing'; end if;

  sid := coalesce(p_student_id, gen_random_uuid());
  insert into public.li_students(id, room_id, label, student_code_hash, updated_at)
  values (sid, p_room_id, trim(p_label), public.li_hash(trim(p_student_code)), now())
  on conflict (id) do update set
    label=excluded.label, student_code_hash=excluded.student_code_hash, updated_at=now();

  insert into public.li_assignments(room_id, student_id, item_id)
  select p_room_id, sid, l.item_id
  from public.li_library_room_links x
  join public.li_library_items l on l.library_id=x.library_id
  where x.room_id=p_room_id and x.active=true
  on conflict do nothing;

  return sid;
end;
$$;

create or replace function public.lerninsel_teacher_create_parent_access(
  p_room_id uuid,
  p_student_id uuid,
  p_label text,
  p_parent_code text
) returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare v_id uuid;
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if not exists(select 1 from public.li_students where id=p_student_id and room_id=p_room_id) then
    raise exception 'student not found';
  end if;
  if length(trim(p_parent_code)) < 6 then raise exception 'parent code too short'; end if;

  insert into public.li_parent_codes(room_id, student_id, code_hash, active, label)
  values (p_room_id, p_student_id, public.li_hash(upper(trim(p_parent_code))), true,
          coalesce(nullif(trim(p_label),''),'Eltern'))
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.lerninsel_teacher_rename_room(
  p_room_id uuid,
  p_name text
) returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if trim(coalesce(p_name,'')) = '' then raise exception 'room name missing'; end if;
  update public.li_rooms set name=trim(p_name) where id=p_room_id;
end;
$$;

-- Lehrerzustand jetzt inklusive aktiver Klasseninhalte und Elternzugänge.
create or replace function public.lerninsel_teacher_get_state(p_room_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare result jsonb;
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;

  select jsonb_build_object(
    'students', coalesce((
      select jsonb_agg(jsonb_build_object('id',s.id,'label',s.label,'createdAt',s.created_at) order by s.label)
      from public.li_students s where s.room_id=p_room_id
    ), '[]'::jsonb),
    'items', coalesce((
      select jsonb_agg(l.item order by l.item_id)
      from public.li_library_room_links x
      join public.li_library_items l on l.library_id=x.library_id
      where x.room_id=p_room_id and x.active=true
    ), '[]'::jsonb),
    'parents', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id',p.id,'studentId',p.student_id,'label',p.label,'active',p.active,'createdAt',p.created_at
      ) order by p.created_at desc)
      from public.li_parent_codes p where p.room_id=p_room_id
    ), '[]'::jsonb),
    'progress', coalesce((
      select jsonb_object_agg(student_id::text, student_progress)
      from (
        select student_id, jsonb_object_agg(item_id,progress) student_progress
        from public.li_progress where room_id=p_room_id group by student_id
      ) q
    ), '{}'::jsonb),
    'events', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id',e.id,'studentId',e.student_id,'itemId',e.item_id,
        'type',e.event_type,'detail',e.detail,
        'at',(extract(epoch from e.created_at)*1000)::bigint
      ) order by e.created_at desc)
      from public.li_events e where e.room_id=p_room_id
    ), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;

revoke execute on function public.lerninsel_teacher_library_get() from public;
revoke execute on function public.lerninsel_teacher_library_upsert(jsonb,uuid[]) from public;
revoke execute on function public.lerninsel_teacher_library_seed(jsonb,uuid) from public;
revoke execute on function public.lerninsel_teacher_create_parent_access(uuid,uuid,text,text) from public;
revoke execute on function public.lerninsel_teacher_rename_room(uuid,text) from public;

grant execute on function public.lerninsel_teacher_library_get() to authenticated;
grant execute on function public.lerninsel_teacher_library_upsert(jsonb,uuid[]) to authenticated;
grant execute on function public.lerninsel_teacher_library_seed(jsonb,uuid) to authenticated;
grant execute on function public.lerninsel_teacher_create_parent_access(uuid,uuid,text,text) to authenticated;
grant execute on function public.lerninsel_teacher_rename_room(uuid,text) to authenticated;

commit;
