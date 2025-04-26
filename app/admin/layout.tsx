"use client";

import { Header } from "@/components/admin/header";
import { useAdminAuth } from "@/hooks/use-admin-auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { admin, handleLogout } = useAdminAuth();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header admin={admin} onLogout={handleLogout} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
