-- Get the admin user from auth.users and insert into admin_users
INSERT INTO public.admin_users (
    email,
    is_active,
    created_at
)
SELECT
    email,
    true as is_active,
    created_at
FROM auth.users
WHERE email = 'your-admin-email@example.com' -- Replace with your admin email
AND NOT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE email = auth.users.email
);

-- Add a comment to explain the migration
COMMENT ON TABLE public.admin_users IS 'Stores admin users synchronized from auth.users';

-- Create a trigger to automatically sync new admin users
CREATE OR REPLACE FUNCTION public.sync_admin_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.admin_users (email, is_active, created_at)
    VALUES (NEW.email, true, NEW.created_at);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS sync_admin_user_trigger ON auth.users;

-- Create the trigger
CREATE TRIGGER sync_admin_user_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    WHEN (NEW.email = 'your-admin-email@example.com') -- Replace with your admin email
    EXECUTE FUNCTION public.sync_admin_user();
