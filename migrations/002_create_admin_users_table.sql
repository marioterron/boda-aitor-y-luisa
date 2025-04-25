-- Create the admin users table
create table public.admin_users (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    email text not null unique,
    password_hash text not null,
    is_active boolean default true,
    last_login timestamptz
);

-- Enable Row Level Security (RLS)
alter table public.admin_users enable row level security;

-- Create policies
create policy "Enable insert for authenticated users only"
    on public.admin_users for insert
    to authenticated
    with check (true);

create policy "Enable read for authenticated users only"
    on public.admin_users for select
    to authenticated
    using (true);

-- Add a comment to the table
comment on table public.admin_users is 'Stores admin users for the wedding platform';
