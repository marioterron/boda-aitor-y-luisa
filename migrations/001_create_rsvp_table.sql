-- Create the RSVP table
create table public.rsvps (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    full_name text not null,
    email text not null,
    attendance text not null,
    guests integer not null,
    dietary_requirements text,
    message text,
    constraint attendance_check check (attendance in ('attending', 'not-attending')),
    constraint guests_check check (guests >= 0 and guests <= 4)
);

-- Enable Row Level Security (RLS)
alter table public.rsvps enable row level security;

-- Create policies
create policy "Enable insert access for all users" on public.rsvps
    for insert
    with check (true);

-- Create an index on email for faster lookups
create index rsvps_email_idx on public.rsvps (email);

-- Add a comment to the table
comment on table public.rsvps is 'Stores wedding RSVP responses from guests';
