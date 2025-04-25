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
    guests: number;
    guest_names?: string[];
    [key: string]: any; // For additional fields
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
        <TableCell>{rsvp.guests || 0}</TableCell>
        <TableCell>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={5} className="bg-gray-50 p-4">
            <div className="space-y-4">
              {rsvp.guest_names && rsvp.guest_names.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900">Companion Names</h4>
                  <p className="text-sm text-gray-500">
                    {rsvp.guest_names.join(", ")}
                  </p>
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">
                  Additional Information
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {Object.entries(rsvp)
                    .filter(
                      ([key]) =>
                        ![
                          "id",
                          "full_name",
                          "email",
                          "attendance",
                          "guests",
                          "guest_names",
                        ].includes(key)
                    )
                    .map(([key, value]) => (
                      <div key={key}>
                        <span className="text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>{" "}
                        <span className="text-sm text-gray-900">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
