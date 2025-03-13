-- Drop the existing update policy
drop policy if exists "Enable update for users based on email" on public.rsvps;

-- Create a new policy that allows updates based on email match only
create policy "Enable update for all users based on email match" on public.rsvps
    for update using (true)
    with check (true);

-- Ensure insert policy exists (in case it was dropped)
drop policy if exists "Enable insert access for all users" on public.rsvps;
create policy "Enable insert access for all users" on public.rsvps
    for insert
    with check (true);
