-- Add unique constraint on email
alter table public.rsvps
    add constraint rsvp_email_unique unique (email);

-- Add email format check
alter table public.rsvps
    add constraint email_format_check
    check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add policy to allow updates based on email
create policy "Enable update for users based on email" on public.rsvps
    for update using (
        auth.email() = email
    )
    with check (
        auth.email() = email
    );
