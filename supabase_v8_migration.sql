
-- Lerninsel v8 – Erweiterung für Profile, Elterncode, Belohnungsspiel und Live-Quiz
-- Voraussetzung: Die bisherige Lerninsel-Supabase-Struktur ist bereits vorhanden.
-- Dieses Skript ergänzt sie; bestehende Lern-/Schülerdaten werden nicht gelöscht.

begin;

create table if not exists public.li_student_profiles (
  student_id uuid primary key references public.li_students(id) on delete cascade,
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  nickname text not null default '',
  avatar text not null default '🦊',
  games_spent integer not null default 0 check (games_spent >= 0),
  game_best integer not null default 0 check (game_best >= 0),
  updated_at timestamptz not null default now()
);

create index if not exists li_student_profiles_room_idx
  on public.li_student_profiles(room_id);

create table if not exists public.li_parent_codes (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  code_hash text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists li_parent_codes_lookup_idx
  on public.li_parent_codes(room_id, code_hash, active);

create table if not exists public.li_quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.li_rooms(id) on delete cascade,
  host_user_id uuid not null references auth.users(id) on delete cascade,
  game_code text not null unique,
  subject text not null,
  topic text not null,
  question_ids jsonb not null default '[]'::jsonb,
  status text not null default 'lobby' check (status in ('lobby','question','reveal','finished')),
  current_index integer not null default -1,
  question_seconds integer not null default 15 check (question_seconds between 5 and 120),
  question_started_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists li_quiz_sessions_room_idx
  on public.li_quiz_sessions(room_id, created_at desc);

create table if not exists public.li_quiz_players (
  session_id uuid not null references public.li_quiz_sessions(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  nickname text not null,
  avatar text not null,
  score integer not null default 0,
  joined_at timestamptz not null default now(),
  primary key (session_id, student_id)
);

create table if not exists public.li_quiz_answers (
  session_id uuid not null references public.li_quiz_sessions(id) on delete cascade,
  student_id uuid not null references public.li_students(id) on delete cascade,
  question_index integer not null,
  option_index integer,
  is_correct boolean not null default false,
  points integer not null default 0,
  answered_at timestamptz not null default now(),
  primary key (session_id, student_id, question_index)
);

alter table public.li_student_profiles enable row level security;
alter table public.li_parent_codes enable row level security;
alter table public.li_quiz_sessions enable row level security;
alter table public.li_quiz_players enable row level security;
alter table public.li_quiz_answers enable row level security;

revoke all on public.li_student_profiles from anon, authenticated;
revoke all on public.li_parent_codes from anon, authenticated;
revoke all on public.li_quiz_sessions from anon, authenticated;
revoke all on public.li_quiz_players from anon, authenticated;
revoke all on public.li_quiz_answers from anon, authenticated;

-- -----------------------------
-- Hilfslogik
-- -----------------------------

create or replace function public.li_student_from_codes(
  p_public_code text,
  p_student_code text
) returns table(room_id uuid, student_id uuid, label text)
language sql
security definer
set search_path = public, pg_temp
as $$
  select r.id, s.id, s.label
  from public.li_rooms r
  join public.li_students s on s.room_id = r.id
  where upper(r.public_code) = upper(trim(p_public_code))
    and s.student_code_hash = public.li_hash(trim(p_student_code))
  limit 1
$$;

revoke execute on function public.li_student_from_codes(text,text) from public, anon, authenticated;

-- -----------------------------
-- Schülerprofil
-- -----------------------------

create or replace function public.lerninsel_student_get_profile(
  p_public_code text,
  p_student_code text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_label text;
  v_profile jsonb;
begin
  select room_id, student_id, label
    into v_room, v_student, v_label
  from public.li_student_from_codes(p_public_code, p_student_code);

  if v_student is null then
    raise exception 'Ungültiger Schülerzugang';
  end if;

  insert into public.li_student_profiles(student_id, room_id, nickname, avatar)
  values (v_student, v_room, '', '🦊')
  on conflict (student_id) do nothing;

  select jsonb_build_object(
    'student_id', p.student_id,
    'nickname', p.nickname,
    'avatar', p.avatar,
    'games_spent', p.games_spent,
    'game_best', p.game_best
  )
  into v_profile
  from public.li_student_profiles p
  where p.student_id = v_student;

  return v_profile;
end;
$$;

create or replace function public.lerninsel_student_set_profile(
  p_public_code text,
  p_student_code text,
  p_nickname text,
  p_avatar text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_label text;
begin
  select room_id, student_id, label
    into v_room, v_student, v_label
  from public.li_student_from_codes(p_public_code, p_student_code);

  if v_student is null then
    raise exception 'Ungültiger Schülerzugang';
  end if;

  if length(trim(coalesce(p_nickname,''))) < 1 or length(trim(p_nickname)) > 24 then
    raise exception 'Ungültiger Spitzname';
  end if;

  insert into public.li_student_profiles(student_id, room_id, nickname, avatar, updated_at)
  values (v_student, v_room, trim(p_nickname), left(coalesce(p_avatar,'🦊'),16), now())
  on conflict (student_id) do update
    set nickname = excluded.nickname,
        avatar = excluded.avatar,
        updated_at = now();

  return public.lerninsel_student_get_profile(p_public_code, p_student_code);
end;
$$;

create or replace function public.lerninsel_student_use_game_token(
  p_public_code text,
  p_student_code text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_label text;
  v_points integer := 0;
  v_spent integer := 0;
begin
  select room_id, student_id, label
    into v_room, v_student, v_label
  from public.li_student_from_codes(p_public_code, p_student_code);

  if v_student is null then
    raise exception 'Ungültiger Schülerzugang';
  end if;

  insert into public.li_student_profiles(student_id, room_id)
  values (v_student, v_room)
  on conflict (student_id) do nothing;

  select count(*)::integer
    into v_points
  from public.li_progress pr
  where pr.room_id = v_room
    and pr.student_id = v_student
    and lower(coalesce(pr.progress->>'rewarded','false')) = 'true';

  select games_spent into v_spent
  from public.li_student_profiles
  where student_id = v_student
  for update;

  if floor(v_points / 4.0)::integer <= v_spent then
    return jsonb_build_object(
      'ok', false,
      'points', v_points,
      'games_spent', v_spent,
      'available', 0
    );
  end if;

  update public.li_student_profiles
  set games_spent = games_spent + 1, updated_at = now()
  where student_id = v_student
  returning games_spent into v_spent;

  return jsonb_build_object(
    'ok', true,
    'points', v_points,
    'games_spent', v_spent,
    'available', greatest(0, floor(v_points / 4.0)::integer - v_spent)
  );
end;
$$;

create or replace function public.lerninsel_student_save_game_best(
  p_public_code text,
  p_student_code text,
  p_score integer
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_label text;
  v_best integer;
begin
  select room_id, student_id, label
    into v_room, v_student, v_label
  from public.li_student_from_codes(p_public_code, p_student_code);

  if v_student is null then
    raise exception 'Ungültiger Schülerzugang';
  end if;

  insert into public.li_student_profiles(student_id, room_id, game_best)
  values (v_student, v_room, greatest(0, p_score))
  on conflict (student_id) do update
    set game_best = greatest(public.li_student_profiles.game_best, greatest(0,p_score)),
        updated_at = now()
  returning game_best into v_best;

  return jsonb_build_object('game_best', v_best);
end;
$$;

-- -----------------------------
-- Elternzugang nur mit Codes
-- -----------------------------

create or replace function public.lerninsel_teacher_create_parent_code(
  p_room_id uuid,
  p_student_id uuid,
  p_parent_code text
) returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.li_is_teacher(p_room_id) then
    raise exception 'Kein Lehrerzugriff';
  end if;

  if not exists (
    select 1 from public.li_students
    where id = p_student_id and room_id = p_room_id
  ) then
    raise exception 'Schüler gehört nicht zu diesem Lernraum';
  end if;

  update public.li_parent_codes
  set active = false
  where room_id = p_room_id and student_id = p_student_id and active = true;

  insert into public.li_parent_codes(room_id, student_id, code_hash, active)
  values (
    p_room_id,
    p_student_id,
    public.li_hash(upper(trim(p_parent_code))),
    true
  );
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

  if v_room is null then
    raise exception 'Lernraum nicht gefunden';
  end if;

  select pc.student_id into v_student
  from public.li_parent_codes pc
  where pc.room_id = v_room
    and pc.active = true
    and pc.code_hash = public.li_hash(upper(trim(p_parent_code)))
  order by pc.created_at desc
  limit 1;

  if v_student is null then
    raise exception 'Elterncode nicht gefunden';
  end if;

  select jsonb_build_object('id', s.id, 'label', s.label)
    into v_student_json
  from public.li_students s
  where s.id = v_student and s.room_id = v_room;

  select coalesce(
    jsonb_build_object(
      'nickname', p.nickname,
      'avatar', p.avatar,
      'game_best', p.game_best
    ),
    '{}'::jsonb
  )
  into v_profile
  from public.li_student_profiles p
  where p.student_id = v_student;

  if v_profile is null then
    v_profile := '{}'::jsonb;
  end if;

  select coalesce(jsonb_agg(i.item order by i.item_id), '[]'::jsonb)
    into v_items
  from public.li_items i
  join public.li_assignments a
    on a.room_id = i.room_id
   and a.item_id = i.item_id
   and a.student_id = v_student
  where i.room_id = v_room;

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

create or replace function public.lerninsel_teacher_get_profiles(
  p_room_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.li_is_teacher(p_room_id) then
    raise exception 'Kein Lehrerzugriff';
  end if;

  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'studentId', s.id,
      'nickname', coalesce(p.nickname,''),
      'avatar', coalesce(p.avatar,''),
      'gamesSpent', coalesce(p.games_spent,0),
      'gameBest', coalesce(p.game_best,0)
    ) order by s.label)
    from public.li_students s
    left join public.li_student_profiles p on p.student_id = s.id
    where s.room_id = p_room_id
  ), '[]'::jsonb);
end;
$$;

-- -----------------------------
-- Live-Quiz
-- -----------------------------

create or replace function public.lerninsel_teacher_live_start(
  p_room_id uuid,
  p_subject text,
  p_topic text,
  p_game_code text,
  p_seconds integer default 15
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_ids jsonb;
  v_id uuid;
begin
  if not public.li_is_teacher(p_room_id) then
    raise exception 'Kein Lehrerzugriff';
  end if;

  select coalesce(jsonb_agg(i.item_id order by i.item_id), '[]'::jsonb)
    into v_ids
  from public.li_items i
  where i.room_id = p_room_id
    and i.item->>'subject' = p_subject
    and i.item->>'topic' = p_topic
    and i.item->>'kind' = 'quiz';

  if jsonb_array_length(v_ids) = 0 then
    raise exception 'Keine Quizfragen gefunden';
  end if;

  insert into public.li_quiz_sessions(
    room_id, host_user_id, game_code, subject, topic,
    question_ids, status, current_index, question_seconds
  )
  values (
    p_room_id, auth.uid(), trim(p_game_code), p_subject, p_topic,
    v_ids, 'lobby', -1, greatest(5,least(120,p_seconds))
  )
  returning id into v_id;

  return jsonb_build_object('session_id', v_id, 'game_code', trim(p_game_code));
end;
$$;

create or replace function public.lerninsel_teacher_live_state(
  p_session_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_s public.li_quiz_sessions%rowtype;
  v_item_id text;
  v_question jsonb;
  v_players jsonb;
begin
  select * into v_s
  from public.li_quiz_sessions
  where id = p_session_id;

  if v_s.id is null or not public.li_is_teacher(v_s.room_id) then
    raise exception 'Kein Zugriff';
  end if;

  if v_s.current_index >= 0 and v_s.current_index < jsonb_array_length(v_s.question_ids) then
    v_item_id := v_s.question_ids->>v_s.current_index;
    select item into v_question
    from public.li_items
    where room_id = v_s.room_id and item_id = v_item_id;
  end if;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'student_id', x.student_id,
      'nickname', x.nickname,
      'avatar', x.avatar,
      'score', x.score
    ) order by x.score desc, x.joined_at asc
  ), '[]'::jsonb)
  into v_players
  from public.li_quiz_players x
  where x.session_id = v_s.id;

  return jsonb_build_object(
    'session_id', v_s.id,
    'status', v_s.status,
    'current_index', v_s.current_index,
    'question_seconds', v_s.question_seconds,
    'question_started_at', v_s.question_started_at,
    'question', v_question,
    'players', v_players
  );
end;
$$;

create or replace function public.lerninsel_teacher_live_next(
  p_session_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_s public.li_quiz_sessions%rowtype;
  v_next integer;
begin
  select * into v_s
  from public.li_quiz_sessions
  where id = p_session_id
  for update;

  if v_s.id is null or not public.li_is_teacher(v_s.room_id) then
    raise exception 'Kein Zugriff';
  end if;

  v_next := v_s.current_index + 1;

  if v_next >= jsonb_array_length(v_s.question_ids) then
    update public.li_quiz_sessions
    set status = 'finished'
    where id = p_session_id;
  else
    update public.li_quiz_sessions
    set current_index = v_next,
        status = 'question',
        question_started_at = now()
    where id = p_session_id;
  end if;

  return public.lerninsel_teacher_live_state(p_session_id);
end;
$$;

create or replace function public.lerninsel_teacher_live_reveal(
  p_session_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
begin
  select room_id into v_room
  from public.li_quiz_sessions
  where id = p_session_id;

  if v_room is null or not public.li_is_teacher(v_room) then
    raise exception 'Kein Zugriff';
  end if;

  update public.li_quiz_sessions
  set status = 'reveal'
  where id = p_session_id and status = 'question';

  return public.lerninsel_teacher_live_state(p_session_id);
end;
$$;

create or replace function public.lerninsel_teacher_live_finish(
  p_session_id uuid
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
begin
  select room_id into v_room
  from public.li_quiz_sessions
  where id = p_session_id;

  if v_room is null or not public.li_is_teacher(v_room) then
    raise exception 'Kein Zugriff';
  end if;

  update public.li_quiz_sessions set status = 'finished'
  where id = p_session_id;

  return public.lerninsel_teacher_live_state(p_session_id);
end;
$$;

create or replace function public.lerninsel_student_live_join(
  p_public_code text,
  p_student_code text,
  p_game_code text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_label text;
  v_session uuid;
  v_nick text;
  v_avatar text;
begin
  select room_id, student_id, label
    into v_room, v_student, v_label
  from public.li_student_from_codes(p_public_code, p_student_code);

  if v_student is null then
    raise exception 'Ungültiger Schülerzugang';
  end if;

  select id into v_session
  from public.li_quiz_sessions
  where room_id = v_room
    and game_code = trim(p_game_code)
    and status <> 'finished'
  order by created_at desc
  limit 1;

  if v_session is null then
    raise exception 'Spiel nicht gefunden';
  end if;

  insert into public.li_student_profiles(student_id, room_id)
  values (v_student, v_room)
  on conflict (student_id) do nothing;

  select nullif(trim(nickname),''), avatar
    into v_nick, v_avatar
  from public.li_student_profiles
  where student_id = v_student;

  v_nick := coalesce(v_nick, v_label);
  v_avatar := coalesce(v_avatar, '🦊');

  insert into public.li_quiz_players(session_id, student_id, nickname, avatar)
  values (v_session, v_student, v_nick, v_avatar)
  on conflict (session_id, student_id) do update
    set nickname = excluded.nickname,
        avatar = excluded.avatar;

  return jsonb_build_object('session_id', v_session);
end;
$$;

create or replace function public.lerninsel_student_live_state(
  p_public_code text,
  p_student_code text,
  p_game_code text
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_label text;
  v_s public.li_quiz_sessions%rowtype;
  v_item_id text;
  v_question jsonb;
  v_score integer := 0;
  v_rank integer;
  v_remaining numeric := 0;
  v_correct boolean;
begin
  select room_id, student_id, label
    into v_room, v_student, v_label
  from public.li_student_from_codes(p_public_code, p_student_code);

  if v_student is null then
    raise exception 'Ungültiger Schülerzugang';
  end if;

  select * into v_s
  from public.li_quiz_sessions
  where room_id = v_room
    and game_code = trim(p_game_code)
  order by created_at desc
  limit 1;

  if v_s.id is null then
    raise exception 'Spiel nicht gefunden';
  end if;

  select coalesce(score,0) into v_score
  from public.li_quiz_players
  where session_id = v_s.id and student_id = v_student;

  select 1 + count(*)::integer into v_rank
  from public.li_quiz_players
  where session_id = v_s.id and score > v_score;

  if v_s.current_index >= 0 and v_s.current_index < jsonb_array_length(v_s.question_ids) then
    v_item_id := v_s.question_ids->>v_s.current_index;
    select item - 'correct' into v_question
    from public.li_items
    where room_id = v_room and item_id = v_item_id;

    select a.is_correct into v_correct
    from public.li_quiz_answers a
    where a.session_id = v_s.id
      and a.student_id = v_student
      and a.question_index = v_s.current_index;
  end if;

  if v_s.status = 'question' and v_s.question_started_at is not null then
    v_remaining := greatest(
      0,
      v_s.question_seconds - extract(epoch from (now() - v_s.question_started_at))
    );
  end if;

  return jsonb_build_object(
    'session_id', v_s.id,
    'status', v_s.status,
    'current_index', v_s.current_index,
    'question', v_question,
    'remaining', v_remaining,
    'score', v_score,
    'rank', v_rank,
    'was_correct', coalesce(v_correct,false)
  );
end;
$$;

create or replace function public.lerninsel_student_live_answer(
  p_public_code text,
  p_student_code text,
  p_game_code text,
  p_option_index integer
) returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_room uuid;
  v_student uuid;
  v_label text;
  v_s public.li_quiz_sessions%rowtype;
  v_item_id text;
  v_item jsonb;
  v_elapsed numeric;
  v_correct boolean;
  v_points integer := 0;
  v_existing public.li_quiz_answers%rowtype;
begin
  select room_id, student_id, label
    into v_room, v_student, v_label
  from public.li_student_from_codes(p_public_code, p_student_code);

  if v_student is null then
    raise exception 'Ungültiger Schülerzugang';
  end if;

  select * into v_s
  from public.li_quiz_sessions
  where room_id = v_room
    and game_code = trim(p_game_code)
  order by created_at desc
  limit 1
  for update;

  if v_s.id is null or v_s.status <> 'question' or v_s.current_index < 0 then
    raise exception 'Frage ist nicht aktiv';
  end if;

  if not exists (
    select 1 from public.li_quiz_players
    where session_id = v_s.id and student_id = v_student
  ) then
    raise exception 'Nicht am Spiel angemeldet';
  end if;

  select * into v_existing
  from public.li_quiz_answers
  where session_id = v_s.id
    and student_id = v_student
    and question_index = v_s.current_index;

  if v_existing.session_id is not null then
    return jsonb_build_object(
      'correct', v_existing.is_correct,
      'points', v_existing.points
    );
  end if;

  v_elapsed := extract(epoch from (now() - v_s.question_started_at));
  if v_elapsed > v_s.question_seconds + 1 then
    raise exception 'Zeit abgelaufen';
  end if;

  v_item_id := v_s.question_ids->>v_s.current_index;
  select item into v_item
  from public.li_items
  where room_id = v_room and item_id = v_item_id;

  if v_item is null then
    raise exception 'Quizfrage fehlt';
  end if;

  v_correct := (p_option_index = (v_item->>'correct')::integer);

  if v_correct then
    v_points := 500 + round(
      500 * greatest(0, 1 - (v_elapsed / v_s.question_seconds))
    )::integer;
  end if;

  insert into public.li_quiz_answers(
    session_id, student_id, question_index,
    option_index, is_correct, points
  )
  values (
    v_s.id, v_student, v_s.current_index,
    p_option_index, v_correct, v_points
  );

  update public.li_quiz_players
  set score = score + v_points
  where session_id = v_s.id and student_id = v_student;

  return jsonb_build_object('correct', v_correct, 'points', v_points);
end;
$$;

-- -----------------------------
-- Berechtigungen nur explizit
-- -----------------------------

revoke execute on function public.lerninsel_student_get_profile(text,text) from public;
revoke execute on function public.lerninsel_student_set_profile(text,text,text,text) from public;
revoke execute on function public.lerninsel_student_use_game_token(text,text) from public;
revoke execute on function public.lerninsel_student_save_game_best(text,text,integer) from public;
revoke execute on function public.lerninsel_teacher_create_parent_code(uuid,uuid,text) from public;
revoke execute on function public.lerninsel_parent_code_login(text,text) from public;
revoke execute on function public.lerninsel_teacher_get_profiles(uuid) from public;
revoke execute on function public.lerninsel_teacher_live_start(uuid,text,text,text,integer) from public;
revoke execute on function public.lerninsel_teacher_live_state(uuid) from public;
revoke execute on function public.lerninsel_teacher_live_next(uuid) from public;
revoke execute on function public.lerninsel_teacher_live_reveal(uuid) from public;
revoke execute on function public.lerninsel_teacher_live_finish(uuid) from public;
revoke execute on function public.lerninsel_student_live_join(text,text,text) from public;
revoke execute on function public.lerninsel_student_live_state(text,text,text) from public;
revoke execute on function public.lerninsel_student_live_answer(text,text,text,integer) from public;

grant execute on function public.lerninsel_student_get_profile(text,text) to anon, authenticated;
grant execute on function public.lerninsel_student_set_profile(text,text,text,text) to anon, authenticated;
grant execute on function public.lerninsel_student_use_game_token(text,text) to anon, authenticated;
grant execute on function public.lerninsel_student_save_game_best(text,text,integer) to anon, authenticated;
grant execute on function public.lerninsel_parent_code_login(text,text) to anon, authenticated;
grant execute on function public.lerninsel_student_live_join(text,text,text) to anon, authenticated;
grant execute on function public.lerninsel_student_live_state(text,text,text) to anon, authenticated;
grant execute on function public.lerninsel_student_live_answer(text,text,text,integer) to anon, authenticated;

grant execute on function public.lerninsel_teacher_create_parent_code(uuid,uuid,text) to authenticated;
grant execute on function public.lerninsel_teacher_get_profiles(uuid) to authenticated;
grant execute on function public.lerninsel_teacher_live_start(uuid,text,text,text,integer) to authenticated;
grant execute on function public.lerninsel_teacher_live_state(uuid) to authenticated;
grant execute on function public.lerninsel_teacher_live_next(uuid) to authenticated;
grant execute on function public.lerninsel_teacher_live_reveal(uuid) to authenticated;
grant execute on function public.lerninsel_teacher_live_finish(uuid) to authenticated;

commit;
