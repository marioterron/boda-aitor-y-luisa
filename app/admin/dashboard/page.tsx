import { supabase } from "@/lib/services/supabase/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">RSVP List</h2>
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="attending">Attending</SelectItem>
                <SelectItem value="not-attending">Not Attending</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[200px]">Email</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead className="w-[200px]">Companion Names</TableHead>
                <TableHead className="w-[200px]">Additional Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.rsvps?.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell className="font-medium">
                    {rsvp.full_name}
                  </TableCell>
                  <TableCell>{rsvp.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        rsvp.attendance === "attending"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rsvp.attendance === "attending"
                        ? "Attending"
                        : "Not Attending"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(rsvp.created_at).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {rsvp.guest_names?.join(", ") || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    <div className="space-y-1">
                      {rsvp.dietary_requirements && (
                        <div>
                          <strong>Dietary:</strong> {rsvp.dietary_requirements}
                        </div>
                      )}
                      {rsvp.message && (
                        <div>
                          <strong>Message:</strong> {rsvp.message}
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
