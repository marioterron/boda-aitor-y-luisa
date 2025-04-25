import { supabase } from "@/lib/services/supabase/client";
import { RsvpList } from "@/components/dashboard/rsvp-list";
import {
  TrendingUpIcon,
  UsersIcon,
  UserCheckIcon,
  UserXIcon,
  UserPlusIcon,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

async function getDashboardStats() {
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

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Responses"
          value={stats.totalResponses}
          description="All responses combined"
          icon={UsersIcon}
          badgeValue={stats.totalResponses > 0 ? "↑" : "→"}
          footerText="Total RSVPs received"
        />

        <StatCard
          title="Attending"
          value={stats.attending}
          description="Percentage of total responses"
          icon={UserCheckIcon}
          badgeValue={`${stats.attendanceRate.toFixed(0)}%`}
          footerText="Confirmed attendance"
        />

        <StatCard
          title="Not Attending"
          value={stats.notAttending}
          description="Percentage of total responses"
          icon={UserXIcon}
          badgeValue={`${stats.declineRate.toFixed(0)}%`}
          footerText="Unable to attend"
        />

        <StatCard
          title="Total Guests"
          value={stats.totalGuests}
          description="Total expected attendees"
          icon={UserPlusIcon}
          badgeValue="Final Count"
          footerText="Including companions"
        />
      </div>

      <RsvpList rsvps={stats.rsvps} />
    </div>
  );
}
