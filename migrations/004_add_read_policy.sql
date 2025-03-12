-- Add read policy for all users
drop policy if exists "Enable read access for all users" on public.rsvps;
create policy "Enable read access for all users" on public.rsvps
    for select
    using (true);

-- Verify all policies are in place
drop policy if exists "Enable insert access for all users" on public.rsvps;
create policy "Enable insert access for all users" on public.rsvps
    for insert
    with check (true);

drop policy if exists "Enable update for all users based on email match" on public.rsvps;
create policy "Enable update for all users based on email match" on public.rsvps
    for update
    using (true)
    with check (true);
