import { supabase } from "@/lib/services/supabase/client";

export interface DashboardStats {
  totalGuests: number;
  attending: number;
  notAttending: number;
  totalResponses: number;
  attendanceRate: number;
  declineRate: number;
  companionRatio: number;
  rsvps: any[] | null;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data: rsvps, error } = await supabase.from("rsvps").select("*");

  if (error) throw error;

  const attending =
    rsvps?.filter((r) => r.attendance === "attending").length || 0;
  const notAttending =
    rsvps?.filter((r) => r.attendance === "not-attending").length || 0;
  const totalCompanions =
    rsvps?.reduce((acc, r) => acc + (r.guests || 0), 0) || 0;
  const totalGuests = attending + totalCompanions;
  const totalResponses = rsvps?.length || 0;

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
    rsvps,
  };
}
