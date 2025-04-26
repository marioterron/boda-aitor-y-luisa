import type { LucideIcon } from "lucide-react";
import {
  UserCheckIcon,
  UserPlusIcon,
  UsersIcon,
  UserXIcon,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardStats } from "@/lib/types/dashboard";

interface StatCardConfig {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  badgeValue: string;
  footerText: string;
  variant: "default" | "info" | "success" | "warning" | "destructive";
}

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statCards: StatCardConfig[] = [
    {
      title: "Total Responses",
      value: stats.totalResponses,
      description: "All responses combined",
      icon: UsersIcon,
      badgeValue: stats.totalResponses > 0 ? "↑" : "→",
      footerText: "Total RSVPs received",
      variant: "info",
    },
    {
      title: "Attending",
      value: stats.attending,
      description: "Percentage of total responses",
      icon: UserCheckIcon,
      badgeValue: `${stats.attendanceRate.toFixed(0)}%`,
      footerText: "Confirmed attendance",
      variant: "success",
    },
    {
      title: "Not Attending",
      value: stats.notAttending,
      description: "Percentage of total responses",
      icon: UserXIcon,
      badgeValue: `${stats.declineRate.toFixed(0)}%`,
      footerText: "Unable to attend",
      variant: "warning",
    },
    {
      title: "Total Guests",
      value: stats.totalGuests,
      description: "Total expected attendees",
      icon: UserPlusIcon,
      badgeValue: "Final Count",
      footerText: "Including companions",
      variant: "default",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => {
        // Omit the destructive variant to match StatCardProps type
        const { variant, ...cardProps } = card;
        return (
          <StatCard
            key={card.title}
            variant={variant === "destructive" ? "warning" : variant}
            {...cardProps}
          />
        );
      })}
    </div>
  );
}
