import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function loginAdmin(email: string, password: string) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function logoutAdmin() {
  const supabase = createClientComponentClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentAdmin(): Promise<User | null> {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user || null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}

export async function createAdminUser(email: string, password: string) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/admin/dashboard`,
    },
  });

  if (error) throw error;

  // Store additional admin data in the admin_users table
  const { error: adminError } = await supabase
    .from("admin_users")
    .insert([{ email, is_active: true }]);

  if (adminError) throw adminError;

  return data;
}
