"use client";

import { useEffect, useState } from "react";

import { RsvpList } from "@/components/dashboard/rsvp-list";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { StatusModal } from "@/components/dashboard/status-modal";
import { getDashboardStats } from "@/lib/services/admin/dashboard";
import { DashboardStats } from "@/lib/types/dashboard";

const emptyStats: DashboardStats = {
  totalGuests: 0,
  attending: 0,
  notAttending: 0,
  totalResponses: 0,
  attendanceRate: 0,
  declineRate: 0,
  companionRatio: 0,
  rsvps: [],
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"error" | "empty">("error");

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);

        if (data.totalResponses === 0) {
          setModalType("empty");
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
        setModalType("error");
        setIsModalOpen(true);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <RsvpList rsvps={stats.rsvps} />
      {isModalOpen && (
        <StatusModal
          isOpen={isModalOpen}
          type={modalType}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
