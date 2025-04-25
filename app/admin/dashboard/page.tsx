import { supabase } from "@/lib/services/supabase/client";
import { RsvpList } from "./rsvp-list";

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
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Total Responses
            </h3>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {stats.totalResponses > 0 ? "↑" : "→"}
            </span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalResponses}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Attending</h3>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {stats.attendanceRate.toFixed(0)}%
            </span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.attending}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Not Attending</h3>
            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              {stats.declineRate.toFixed(0)}%
            </span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.notAttending}
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Guests</h3>
            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
              Final Count
            </span>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalGuests}
          </p>
        </div>
      </div>

      <RsvpList rsvps={stats.rsvps} />
    </div>
  );
}
