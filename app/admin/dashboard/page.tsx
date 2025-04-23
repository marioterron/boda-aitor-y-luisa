import { supabase } from "@/lib/services/supabase/client";

async function getDashboardStats() {
  const { data: rsvps, error } = await supabase.from("rsvps").select("*");

  if (error) throw error;

  const totalGuests = rsvps?.length || 0;
  const attending =
    rsvps?.filter((r) => r.attendance === "attending").length || 0;
  const notAttending =
    rsvps?.filter((r) => r.attendance === "not-attending").length || 0;
  const totalCompanions =
    rsvps?.reduce((acc, r) => acc + (r.guests || 0), 0) || 0;

  return {
    totalGuests,
    attending,
    notAttending,
    totalCompanions,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Guests</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalGuests}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Attending</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.attending}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Not Attending</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.notAttending}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Total Companions
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stats.totalCompanions}
          </p>
        </div>
      </div>
    </div>
  );
}
