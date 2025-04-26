import { supabase } from "@/lib/services/supabase/client";
import { DashboardStats, Rsvp } from "@/lib/types/dashboard";

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data: rsvps, error } = await supabase.from("rsvps").select("*");

  if (error) throw error;

  const rsvpsData = (rsvps || []) as Rsvp[];
  const attending = rsvpsData.filter(
    (r) => r.attendance === "attending"
  ).length;
  const notAttending = rsvpsData.filter(
    (r) => r.attendance === "not-attending"
  ).length;
  const totalCompanions = rsvpsData.reduce(
    (acc, r) => acc + (r.guests ?? 0),
    0
  );
  const totalGuests = attending + totalCompanions;
  const totalResponses = rsvpsData.length;

  // Calculate percentages
  const attendanceRate =
    totalResponses > 0 ? (attending / totalResponses) * 100 : 0;
  const declineRate =
    totalResponses > 0 ? (notAttending / totalResponses) * 100 : 0;
  const companionRatio = attending > 0 ? totalCompanions / attending : 0;

  return {
    totalGuests,
    attending,
    notAttending,
    totalResponses,
    attendanceRate,
    declineRate,
    companionRatio,
    rsvps: rsvpsData,
  };
}
