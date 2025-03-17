import { supabase } from "@/lib/services/supabase/client";
import type { RsvpApiData } from "@/lib/types/rsvp";
import { sendRsvpConfirmation } from "@/lib/services/email";

export async function checkEmailExists(email: string): Promise<boolean> {
  const { count, error } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true })
    .eq("email", email);

  if (error) throw error;

  return count ? count > 0 : false;
}

export async function createRsvp(rsvpData: RsvpApiData): Promise<void> {
  const { error } = await supabase.from("rsvps").insert([rsvpData]);

  if (error) throw error;

  await sendRsvpConfirmation(rsvpData);
}

export async function updateRsvp(
  email: string,
  rsvpData: RsvpApiData
): Promise<void> {
  const { error } = await supabase
    .from("rsvps")
    .update(rsvpData)
    .eq("email", email)
    .single();

  if (error) throw error;

  await sendRsvpConfirmation(rsvpData);
}
