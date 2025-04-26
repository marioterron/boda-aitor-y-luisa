import {
  AlertCircle,
  UserCheckIcon,
  UserPlusIcon,
  UsersIcon,
  UserXIcon,
} from "lucide-react";

import { RsvpList } from "@/components/dashboard/rsvp-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDashboardStats } from "@/lib/services/admin/dashboard";
import { DashboardStats } from "@/lib/types/dashboard";

export default async function DashboardPage() {
  let stats: DashboardStats;

  try {
    stats = await getDashboardStats();
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading the dashboard data. Please try again later
          or contact the developer.
        </AlertDescription>
      </Alert>
    );
  }

  if (!stats || stats.totalResponses === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No data available</AlertTitle>
        <AlertDescription>
          There are no RSVPs to display yet. Check back later for updates.
        </AlertDescription>
      </Alert>
    );
  }

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
          variant="info"
        />

        <StatCard
          title="Attending"
          value={stats.attending}
          description="Percentage of total responses"
          icon={UserCheckIcon}
          badgeValue={`${stats.attendanceRate.toFixed(0)}%`}
          footerText="Confirmed attendance"
          variant="success"
        />

        <StatCard
          title="Not Attending"
          value={stats.notAttending}
          description="Percentage of total responses"
          icon={UserXIcon}
          badgeValue={`${stats.declineRate.toFixed(0)}%`}
          footerText="Unable to attend"
          variant="warning"
        />

        <StatCard
          title="Total Guests"
          value={stats.totalGuests}
          description="Total expected attendees"
          icon={UserPlusIcon}
          badgeValue="Final Count"
          footerText="Including companions"
          variant="default"
        />
      </div>
      <RsvpList rsvps={stats.rsvps} />
    </div>
  );
}
