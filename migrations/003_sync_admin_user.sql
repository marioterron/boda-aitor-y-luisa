-- Insert the admin user into the admin_users table
INSERT INTO public.admin_users (email, password_hash, is_active)
VALUES (
    'your-email@example.com',  -- Replace with the email you used to create the user
    (SELECT encrypted_password FROM auth.users WHERE email = 'your-email@example.com'),  -- Replace with the same email
    true
);
