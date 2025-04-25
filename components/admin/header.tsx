"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { getCurrentAdmin } from "@/lib/services/admin/auth";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function AdminHeader() {
  const [admin, setAdmin] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminData = await getCurrentAdmin();
      setAdmin(adminData);
    };
    fetchAdmin();
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {admin?.email}
          </span>
        </div>
      </div>
    </header>
  );
}
