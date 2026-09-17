-- Lerninsel v8.1 – Live-Quiz: kleine Punktzahlen + Geschwindigkeit als Tie-Break
begin;

alter table public.li_quiz_answers
  add column if not exists response_ms integer;

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
  v_response_ms integer;
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

  v_response_ms := greatest(0, round(v_elapsed * 1000)::integer);

  v_item_id := v_s.question_ids->>v_s.current_index;
  select item into v_item
  from public.li_items
  where room_id = v_room and item_id = v_item_id;

  if v_item is null then
    raise exception 'Quizfrage fehlt';
  end if;

  v_correct := (p_option_index = (v_item->>'correct')::integer);
  if v_correct then v_points := 1; end if;

  insert into public.li_quiz_answers(
    session_id, student_id, question_index,
    option_index, is_correct, points, response_ms
  ) values (
    v_s.id, v_student, v_s.current_index,
    p_option_index, v_correct, v_points, v_response_ms
  );

  update public.li_quiz_players
  set score = score + v_points
  where session_id = v_s.id and student_id = v_student;

  return jsonb_build_object('correct', v_correct, 'points', v_points);
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
      'student_id', q.student_id,
      'nickname', q.nickname,
      'avatar', q.avatar,
      'score', q.score
    ) order by q.score desc, q.speed_ms asc, q.joined_at asc
  ), '[]'::jsonb)
  into v_players
  from (
    select p.student_id, p.nickname, p.avatar, p.score, p.joined_at,
           coalesce(sum(case when a.is_correct then a.response_ms else 0 end),0) as speed_ms
    from public.li_quiz_players p
    left join public.li_quiz_answers a
      on a.session_id = p.session_id and a.student_id = p.student_id
    where p.session_id = v_s.id
    group by p.student_id, p.nickname, p.avatar, p.score, p.joined_at
  ) q;

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
  v_my_speed bigint := 0;
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

  select coalesce(p.score,0),
         coalesce(sum(case when a.is_correct then a.response_ms else 0 end),0)
    into v_score, v_my_speed
  from public.li_quiz_players p
  left join public.li_quiz_answers a
    on a.session_id = p.session_id and a.student_id = p.student_id
  where p.session_id = v_s.id and p.student_id = v_student
  group by p.score;

  select 1 + count(*)::integer into v_rank
  from (
    select p.student_id, p.score,
           coalesce(sum(case when a.is_correct then a.response_ms else 0 end),0) as speed_ms
    from public.li_quiz_players p
    left join public.li_quiz_answers a
      on a.session_id = p.session_id and a.student_id = p.student_id
    where p.session_id = v_s.id
    group by p.student_id, p.score
  ) x
  where x.score > v_score
     or (x.score = v_score and x.speed_ms < v_my_speed);

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

revoke execute on function public.lerninsel_student_live_answer(text,text,text,integer) from public;
revoke execute on function public.lerninsel_teacher_live_state(uuid) from public;
revoke execute on function public.lerninsel_student_live_state(text,text,text) from public;

grant execute on function public.lerninsel_student_live_answer(text,text,text,integer) to anon, authenticated;
grant execute on function public.lerninsel_student_live_state(text,text,text) to anon, authenticated;
grant execute on function public.lerninsel_teacher_live_state(uuid) to authenticated;

commit;
