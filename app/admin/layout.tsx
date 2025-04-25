"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentAdmin } from "@/lib/services/admin/auth";
import { LogOut, User } from "lucide-react";
import { logoutAdmin } from "@/lib/services/admin/auth";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [admin, setAdmin] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const adminData = await getCurrentAdmin();
      if (!adminData) {
        router.push("/admin/login");
      } else {
        setAdmin(adminData);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex h-14 items-center justify-between border-b bg-white/50 px-4 backdrop-blur-sm">
        <h1 className="text-md font-medium text-gray-600">Dashboard</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 hover:bg-transparent"
            >
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{admin?.email}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end" sideOffset={5}>
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
