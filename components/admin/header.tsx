import { User as SupabaseUser } from "@supabase/supabase-js";
import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HeaderProps {
  admin: SupabaseUser | null;
  onLogout: () => Promise<void>;
}

export function Header({ admin, onLogout }: HeaderProps) {
  return (
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
            onClick={onLogout}
            className="flex w-full items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
