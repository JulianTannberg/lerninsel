begin;

create or replace function public.lerninsel_teacher_reset_parent_access(
  p_room_id uuid,
  p_parent_id uuid,
  p_parent_code text
) returns void
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
begin
  if not public.li_is_teacher(p_room_id) then raise exception 'forbidden'; end if;
  if length(trim(p_parent_code)) < 6 then raise exception 'parent code too short'; end if;

  update public.li_parent_codes
  set code_hash=public.li_hash(upper(trim(p_parent_code))), active=true
  where id=p_parent_id and room_id=p_room_id;

  if not found then raise exception 'parent access not found'; end if;
end;
$$;

revoke execute on function public.lerninsel_teacher_reset_parent_access(uuid,uuid,text) from public;
grant execute on function public.lerninsel_teacher_reset_parent_access(uuid,uuid,text) to authenticated;

notify pgrst, 'reload schema';
commit;
