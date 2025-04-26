import { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCurrentAdmin, logoutAdmin } from "@/lib/services/admin/auth";

interface UseAdminAuthReturn {
  admin: SupabaseUser | null;
  handleLogout: () => Promise<void>;
}

export function useAdminAuth(): UseAdminAuthReturn {
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

  return { admin, handleLogout };
}
