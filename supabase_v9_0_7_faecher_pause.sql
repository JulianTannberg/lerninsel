-- Lerninsel v9.0.7
-- Einmal im Supabase SQL Editor vollständig ausführen.
-- Fächer können pro Lernraum und zusätzlich pro Schüler pausiert werden.
-- Inhalte, Zuweisungen und Lernstände werden dabei nicht gelöscht.

begin;

create table if not exists public.li_room_subject_settings (
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  subject_id text not null check (subject_id in ('mathe','englisch','deutsch','gsel1','gsel2','natur')),
  active boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (room_id, subject_id)
);

create table if not exists public.li_student_subject_settings (
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  subject_id text not null check (subject_id in ('mathe','englisch','deutsch','gsel1','gsel2','natur')),
  active boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (room_id, student_id, subject_id)
);

create index if not exists li_student_subject_settings_lookup_idx
  on public.li_student_subject_settings(room_id, student_id, subject_id, active);

alter table public.li_room_subject_settings enable row level security;
alter table public.li_student_subject_settings enable row level security;
revoke all on public.li_room_subject_settings from anon, authenticated;
revoke all on public.li_student_subject_settings from anon, authenticated;

create or replace function public.lerninsel_teacher_set_room_subject(
  p_room_id uuid,
  p_subject_id text,
  p_active boolean
) returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if p_subject_id not in ('mathe','englisch','deutsch','gsel1','gsel2','natur') then
    raise exception 'unknown subject';
  end if;

  insert into public.li_room_subject_settings(room_id, subject_id, active, updated_at)
  values (p_room_id, p_subject_id, coalesce(p_active,false), now())
  on conflict (room_id, subject_id) do update
    set active=excluded.active, updated_at=now();
end;
$$;

create or replace function public.lerninsel_teacher_set_student_subject(
  p_room_id uuid,
  p_student_id uuid,
  p_subject_id text,
  p_active boolean
) returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if not exists(select 1 from public.li_students where id=p_student_id and room_id=p_room_id) then
    raise exception 'student not found';
  end if;
  if p_subject_id not in ('mathe','englisch','deutsch','gsel1','gsel2','natur') then
    raise exception 'unknown subject';
  end if;

  insert into public.li_student_subject_settings(room_id, student_id, subject_id, active, updated_at)
  values (p_room_id, p_student_id, p_subject_id, coalesce(p_active,false), now())
  on conflict (room_id, student_id, subject_id) do update
    set active=excluded.active, updated_at=now();
end;
$$;

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
    'roomSubjects', coalesce((
      select jsonb_object_agg(x.subject_id,x.active)
      from public.li_room_subject_settings x where x.room_id=p_room_id
    ), '{}'::jsonb),
    'studentSubjects', coalesce((
      select jsonb_object_agg(q.student_id::text,q.subject_settings)
      from (
        select x.student_id,jsonb_object_agg(x.subject_id,x.active) as subject_settings
        from public.li_student_subject_settings x
        where x.room_id=p_room_id
        group by x.student_id
      ) q
    ), '{}'::jsonb),
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

create or replace function public.lerninsel_student_login(p_public_code text, p_student_code text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare rid uuid; sid uuid; lab text; result jsonb;
begin
  select id into rid from public.li_rooms where public_code=upper(trim(p_public_code));
  if rid is null then return null; end if;

  select id,label into sid,lab from public.li_students
  where room_id=rid and student_code_hash=public.li_hash(trim(p_student_code)) limit 1;
  if sid is null then return null; end if;

  select jsonb_build_object(
    'student',jsonb_build_object('id',sid,'label',lab),
    'items',coalesce((
      select jsonb_agg(i.item order by i.item_id)
      from public.li_assignments a
      join public.li_items i on i.room_id=a.room_id and i.item_id=a.item_id
      where a.room_id=rid and a.student_id=sid
        and coalesce((select x.active from public.li_room_subject_settings x where x.room_id=rid and x.subject_id=i.item->>'subject'),true)
        and coalesce((select x.active from public.li_student_subject_settings x where x.room_id=rid and x.student_id=sid and x.subject_id=i.item->>'subject'),true)
    ),'[]'::jsonb),
    'progress',coalesce((
      select jsonb_object_agg(item_id,progress)
      from public.li_progress
      where room_id=rid and student_id=sid
    ),'{}'::jsonb)
  ) into result;

  return result;
end;
$$;

create or replace function public.lerninsel_parent_code_login(
  p_public_code text,
  p_parent_code text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_student_json jsonb;
  v_profile jsonb;
  v_items jsonb;
  v_progress jsonb;
begin
  select id into v_room
  from public.li_rooms
  where upper(public_code) = upper(trim(p_public_code))
  limit 1;

  if v_room is null then raise exception 'Lernraum nicht gefunden'; end if;

  select pc.student_id into v_student
  from public.li_parent_codes pc
  where pc.room_id = v_room
    and pc.active = true
    and pc.code_hash = public.li_hash(upper(trim(p_parent_code)))
  order by pc.created_at desc
  limit 1;

  if v_student is null then raise exception 'Elterncode nicht gefunden'; end if;

  select jsonb_build_object('id', s.id, 'label', s.label)
    into v_student_json
  from public.li_students s
  where s.id = v_student and s.room_id = v_room;

  select coalesce(
    jsonb_build_object('nickname',p.nickname,'avatar',p.avatar,'game_best',p.game_best),
    '{}'::jsonb
  ) into v_profile
  from public.li_student_profiles p
  where p.student_id = v_student;

  if v_profile is null then v_profile := '{}'::jsonb; end if;

  select coalesce(jsonb_agg(i.item order by i.item_id), '[]'::jsonb)
    into v_items
  from public.li_items i
  join public.li_assignments a
    on a.room_id = i.room_id and a.item_id = i.item_id and a.student_id = v_student
  where i.room_id = v_room
    and coalesce((select x.active from public.li_room_subject_settings x where x.room_id=v_room and x.subject_id=i.item->>'subject'),true)
    and coalesce((select x.active from public.li_student_subject_settings x where x.room_id=v_room and x.student_id=v_student and x.subject_id=i.item->>'subject'),true);

  select coalesce(jsonb_object_agg(pr.item_id, pr.progress), '{}'::jsonb)
    into v_progress
  from public.li_progress pr
  where pr.room_id = v_room and pr.student_id = v_student;

  return jsonb_build_object(
    'student', v_student_json,
    'profile', v_profile,
    'items', v_items,
    'progress', v_progress
  );
end;
$$;

revoke execute on function public.lerninsel_teacher_set_room_subject(uuid,text,boolean) from public;
revoke execute on function public.lerninsel_teacher_set_student_subject(uuid,uuid,text,boolean) from public;
revoke execute on function public.lerninsel_teacher_get_state(uuid) from public;
revoke execute on function public.lerninsel_student_login(text,text) from public;
revoke execute on function public.lerninsel_parent_code_login(text,text) from public;

grant execute on function public.lerninsel_teacher_set_room_subject(uuid,text,boolean) to authenticated;
grant execute on function public.lerninsel_teacher_set_student_subject(uuid,uuid,text,boolean) to authenticated;
grant execute on function public.lerninsel_teacher_get_state(uuid) to authenticated;
grant execute on function public.lerninsel_student_login(text,text) to anon, authenticated;
grant execute on function public.lerninsel_parent_code_login(text,text) to anon, authenticated;

commit;
