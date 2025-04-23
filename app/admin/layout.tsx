"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentAdmin } from "@/lib/services/admin/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const admin = await getCurrentAdmin();
      if (!admin) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
