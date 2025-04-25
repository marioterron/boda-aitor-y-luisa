"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Info,
  Utensils,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const hasAdditionalInfo = rsvp.dietary_requirements || rsvp.message;

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{rsvp.full_name}</TableCell>
        <TableCell>{rsvp.email}</TableCell>
        <TableCell>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              rsvp.attendance === "attending"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {rsvp.attendance === "attending" ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Attending
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5" />
                Not Attending
              </>
            )}
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
          {hasAdditionalInfo ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`inline-flex items-center gap-1 ${
                    rsvp.dietary_requirements
                      ? "text-amber-600 hover:text-amber-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {rsvp.dietary_requirements ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Info className="h-4 w-4" />
                  )}
                  <span className="text-xs">View details</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  {rsvp.dietary_requirements && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <Utensils className="h-3.5 w-3.5" />
                        Dietary Requirements
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {rsvp.dietary_requirements}
                      </p>
                    </div>
                  )}
                  {rsvp.message && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Message
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {rsvp.message}
                      </p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
