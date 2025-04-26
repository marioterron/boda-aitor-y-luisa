import { AlertCircle } from "lucide-react";

import { RsvpList } from "@/components/dashboard/rsvp-list";
import { StatsGrid } from "@/components/dashboard/stats-grid";
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
      <StatsGrid stats={stats} />
      <RsvpList rsvps={stats.rsvps} />
    </div>
  );
}
