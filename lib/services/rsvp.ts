import { supabase } from "@/lib/supabase";

interface RsvpData {
  full_name: string;
  email: string;
  attendance: "attending" | "not-attending";
  guests: number;
  dietary_requirements?: string;
  message?: string;
  created_at: string;
}

export async function checkEmailExists(email: string) {
  const { count, error } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("email", email);

  if (error) throw error;

  return count ? count > 0 : false;
}

export async function createRsvp(rsvpData: RsvpData) {
  const { error } = await supabase.from("rsvps").insert([rsvpData]);

  if (error) throw error;
}

export async function updateRsvp(email: string, rsvpData: RsvpData) {
  const { error } = await supabase
    .from("rsvps")
    .update(rsvpData)
    .eq("email", email)
    .single();

  if (error) throw error;
}
