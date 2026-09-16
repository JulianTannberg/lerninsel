-- LERNINSEL – Supabase-Schema mit Lehrer-, Schüler- und Elternzugang
-- Alle Objekte sind mit li_ bzw. lerninsel_ präfixiert und können daher
-- in einem bestehenden Supabase-Projekt neben anderen Apps verwendet werden.

create extension if not exists pgcrypto;

create table if not exists public.li_rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Lerninsel',
  public_code text not null unique,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.li_room_members (
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('teacher')),
  created_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table if not exists public.li_students (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  label text not null,
  student_code_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (room_id, student_code_hash)
);

create table if not exists public.li_items (
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  item_id text not null,
  item jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (room_id, item_id)
);

create table if not exists public.li_assignments (
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  item_id text not null,
  created_at timestamptz not null default now(),
  primary key (room_id, student_id, item_id)
);

create table if not exists public.li_progress (
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  item_id text not null,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (room_id, student_id, item_id)
);

create table if not exists public.li_events (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  item_id text,
  event_type text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.li_guardians (
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (room_id, student_id, user_id)
);

create table if not exists public.li_guardian_invites (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  code_hash text not null unique,
  expires_at timestamptz not null default (now() + interval '30 days'),
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists li_events_room_student_idx on public.li_events(room_id, student_id, created_at desc);
create index if not exists li_progress_room_student_idx on public.li_progress(room_id, student_id);

alter table public.li_rooms enable row level security;
alter table public.li_room_members enable row level security;
alter table public.li_students enable row level security;
alter table public.li_items enable row level security;
alter table public.li_assignments enable row level security;
alter table public.li_progress enable row level security;
alter table public.li_events enable row level security;
alter table public.li_guardians enable row level security;
alter table public.li_guardian_invites enable row level security;

revoke all on public.li_rooms from anon, authenticated;
revoke all on public.li_room_members from anon, authenticated;
revoke all on public.li_students from anon, authenticated;
revoke all on public.li_items from anon, authenticated;
revoke all on public.li_assignments from anon, authenticated;
revoke all on public.li_progress from anon, authenticated;
revoke all on public.li_events from anon, authenticated;
revoke all on public.li_guardians from anon, authenticated;
revoke all on public.li_guardian_invites from anon, authenticated;

create or replace function public.li_hash(x text)
returns text
language sql
immutable
as $$ select encode(digest(coalesce(x,''), 'sha256'), 'hex') $$;

create or replace function public.li_is_teacher(rid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and exists (
    select 1 from public.li_room_members m
    where m.room_id = rid
      and m.user_id = auth.uid()
      and m.role = 'teacher'
  )
$$;

create or replace function public.lerninsel_create_room(p_name text, p_public_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare rid uuid;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  if length(trim(p_public_code)) < 6 then raise exception 'room code too short'; end if;

  insert into public.li_rooms(name, public_code, created_by)
  values (coalesce(nullif(trim(p_name),''),'Lerninsel'), upper(trim(p_public_code)), auth.uid())
  returning id into rid;

  insert into public.li_room_members(room_id, user_id, role)
  values (rid, auth.uid(), 'teacher');

  return rid;
end $$;

create or replace function public.lerninsel_teacher_list_rooms()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', r.id,
    'name', r.name,
    'publicCode', r.public_code,
    'createdAt', r.created_at
  ) order by r.created_at), '[]'::jsonb)
  from public.li_rooms r
  join public.li_room_members m on m.room_id = r.id
  where m.user_id = auth.uid() and m.role = 'teacher'
$$;

create or replace function public.lerninsel_teacher_upsert_student(
  p_room_id uuid,
  p_student_id uuid,
  p_label text,
  p_student_code text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare sid uuid;
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if length(trim(p_student_code)) < 4 then raise exception 'student code too short'; end if;

  sid := coalesce(p_student_id, gen_random_uuid());

  insert into public.li_students(id, room_id, label, student_code_hash, updated_at)
  values (sid, p_room_id, trim(p_label), public.li_hash(trim(p_student_code)), now())
  on conflict (id) do update set
    label = excluded.label,
    student_code_hash = excluded.student_code_hash,
    updated_at = now();

  return sid;
end $$;

create or replace function public.lerninsel_teacher_delete_student(p_room_id uuid, p_student_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  delete from public.li_students where id = p_student_id and room_id = p_room_id;
end $$;

create or replace function public.lerninsel_teacher_sync_content(p_room_id uuid, p_payload jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare i jsonb; a jsonb;
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;

  for i in select * from jsonb_array_elements(coalesce(p_payload->'items','[]'::jsonb)) loop
    insert into public.li_items(room_id, item_id, item, updated_at)
    values (p_room_id, i->>'id', i, now())
    on conflict (room_id, item_id) do update set item = excluded.item, updated_at = now();
  end loop;

  delete from public.li_assignments where room_id = p_room_id;

  for a in select * from jsonb_array_elements(coalesce(p_payload->'assignments','[]'::jsonb)) loop
    insert into public.li_assignments(room_id, student_id, item_id)
    values (p_room_id, (a->>'studentId')::uuid, a->>'itemId')
    on conflict do nothing;
  end loop;
end $$;

create or replace function public.lerninsel_teacher_get_state(p_room_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare result jsonb;
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;

  select jsonb_build_object(
    'students', coalesce((
      select jsonb_agg(jsonb_build_object('id',s.id,'label',s.label,'createdAt',s.created_at) order by s.label)
      from public.li_students s where s.room_id = p_room_id
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
end $$;

create or replace function public.lerninsel_teacher_create_parent_invite(
  p_room_id uuid,
  p_student_id uuid,
  p_invite_code text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if not exists(select 1 from public.li_students where id=p_student_id and room_id=p_room_id) then
    raise exception 'student not found';
  end if;
  if length(trim(p_invite_code)) < 6 then raise exception 'invite code too short'; end if;

  insert into public.li_guardian_invites(room_id,student_id,code_hash,expires_at)
  values (p_room_id,p_student_id,public.li_hash(upper(trim(p_invite_code))),now()+interval '30 days');
end $$;

create or replace function public.lerninsel_student_login(p_public_code text, p_student_code text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
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
    ),'[]'::jsonb),
    'progress',coalesce((
      select jsonb_object_agg(item_id,progress)
      from public.li_progress
      where room_id=rid and student_id=sid
    ),'{}'::jsonb)
  ) into result;

  return result;
end $$;

create or replace function public.lerninsel_student_save_progress(
  p_public_code text,
  p_student_code text,
  p_item_id text,
  p_progress jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare rid uuid; sid uuid;
begin
  select id into rid from public.li_rooms where public_code=upper(trim(p_public_code));
  select id into sid from public.li_students
  where room_id=rid and student_code_hash=public.li_hash(trim(p_student_code)) limit 1;
  if sid is null then raise exception 'forbidden'; end if;

  if not exists(select 1 from public.li_assignments where room_id=rid and student_id=sid and item_id=p_item_id) then
    raise exception 'item not assigned';
  end if;

  insert into public.li_progress(room_id,student_id,item_id,progress,updated_at)
  values (rid,sid,p_item_id,coalesce(p_progress,'{}'::jsonb),now())
  on conflict (room_id,student_id,item_id)
  do update set progress=excluded.progress,updated_at=now();
end $$;

create or replace function public.lerninsel_student_event(
  p_public_code text,
  p_student_code text,
  p_item_id text,
  p_event_type text,
  p_detail jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare rid uuid; sid uuid;
begin
  select id into rid from public.li_rooms where public_code=upper(trim(p_public_code));
  select id into sid from public.li_students
  where room_id=rid and student_code_hash=public.li_hash(trim(p_student_code)) limit 1;
  if sid is null then raise exception 'forbidden'; end if;

  insert into public.li_events(room_id,student_id,item_id,event_type,detail)
  values (rid,sid,p_item_id,p_event_type,coalesce(p_detail,'{}'::jsonb));
end $$;

create or replace function public.lerninsel_parent_claim(p_public_code text, p_invite_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare rid uuid; inv public.li_guardian_invites%rowtype; student_label text;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;

  select id into rid from public.li_rooms where public_code=upper(trim(p_public_code));
  if rid is null then raise exception 'room not found'; end if;

  select * into inv from public.li_guardian_invites
  where room_id=rid
    and code_hash=public.li_hash(upper(trim(p_invite_code)))
    and used_at is null
    and expires_at>now()
  limit 1;

  if inv.id is null then raise exception 'invalid or expired invite'; end if;

  insert into public.li_guardians(room_id,student_id,user_id)
  values (rid,inv.student_id,auth.uid())
  on conflict do nothing;

  update public.li_guardian_invites set used_at=now() where id=inv.id;
  select label into student_label from public.li_students where id=inv.student_id;

  return jsonb_build_object('roomId',rid,'studentId',inv.student_id,'studentLabel',student_label);
end $$;

create or replace function public.lerninsel_parent_list_children()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'roomId',g.room_id,
    'roomName',r.name,
    'studentId',s.id,
    'studentLabel',s.label
  ) order by r.name,s.label),'[]'::jsonb)
  from public.li_guardians g
  join public.li_rooms r on r.id=g.room_id
  join public.li_students s on s.id=g.student_id
  where g.user_id=auth.uid()
$$;

create or replace function public.lerninsel_parent_get_state(p_room_id uuid, p_student_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare result jsonb;
begin
  if auth.uid() is null or not exists(
    select 1 from public.li_guardians
    where room_id=p_room_id and student_id=p_student_id and user_id=auth.uid()
  ) then raise exception 'forbidden'; end if;

  select jsonb_build_object(
    'student',(select jsonb_build_object('id',id,'label',label) from public.li_students where id=p_student_id and room_id=p_room_id),
    'items',coalesce((
      select jsonb_agg(jsonb_build_object(
        'id',i.item_id,'title',i.item->>'title','kind',i.item->>'kind','type',i.item->>'type'
      ) order by i.item_id)
      from public.li_assignments a
      join public.li_items i on i.room_id=a.room_id and i.item_id=a.item_id
      where a.room_id=p_room_id and a.student_id=p_student_id
    ),'[]'::jsonb),
    'progress',coalesce((
      select jsonb_object_agg(item_id,progress)
      from public.li_progress
      where room_id=p_room_id and student_id=p_student_id
    ),'{}'::jsonb)
  ) into result;

  return result;
end $$;

revoke all on function public.li_hash(text) from public;
revoke all on function public.li_is_teacher(uuid) from public;

grant execute on function public.lerninsel_create_room(text,text) to authenticated;
grant execute on function public.lerninsel_teacher_list_rooms() to authenticated;
grant execute on function public.lerninsel_teacher_upsert_student(uuid,uuid,text,text) to authenticated;
grant execute on function public.lerninsel_teacher_delete_student(uuid,uuid) to authenticated;
grant execute on function public.lerninsel_teacher_sync_content(uuid,jsonb) to authenticated;
grant execute on function public.lerninsel_teacher_get_state(uuid) to authenticated;
grant execute on function public.lerninsel_teacher_create_parent_invite(uuid,uuid,text) to authenticated;

grant execute on function public.lerninsel_student_login(text,text) to anon, authenticated;
grant execute on function public.lerninsel_student_save_progress(text,text,text,jsonb) to anon, authenticated;
grant execute on function public.lerninsel_student_event(text,text,text,text,jsonb) to anon, authenticated;

grant execute on function public.lerninsel_parent_claim(text,text) to authenticated;
grant execute on function public.lerninsel_parent_list_children() to authenticated;
grant execute on function public.lerninsel_parent_get_state(uuid,uuid) to authenticated;
