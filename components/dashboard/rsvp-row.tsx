"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

interface RsvpRowProps {
  rsvp: {
    id: string;
    full_name: string;
    email: string;
    attendance: string;
    created_at: string;
    guest_names?: string[];
    dietary_requirements?: string;
    message?: string;
  };
}

export function RsvpRow({ rsvp }: RsvpRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{rsvp.full_name}</TableCell>
        <TableCell>{rsvp.email}</TableCell>
        <TableCell>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              rsvp.attendance === "attending"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {rsvp.attendance === "attending" ? "Attending" : "Not Attending"}
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
            {!rsvp.dietary_requirements && !rsvp.message && (
              <div className="text-gray-400">-</div>
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
