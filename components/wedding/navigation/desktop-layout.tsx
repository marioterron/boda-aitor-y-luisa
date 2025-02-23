import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NavLinks } from "./nav-links";

interface DesktopLayoutProps {
  scrollToRSVP: () => void;
}

export function DesktopLayout({ scrollToRSVP }: DesktopLayoutProps) {
  return (
    <div className="hidden md:block mx-auto px-4">
      <div className="relative flex h-20 items-center justify-between">
        <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl md:text-2xl">
          <Link href="/">AITOR & LUISA</Link>
        </h1>
        <NavLinks className="flex items-center space-x-8 " />
        <div className="flex items-center">
          <Button
            onClick={scrollToRSVP}
            variant="outline"
            size="sm"
            className="uppercase"
          >
            RSVP
          </Button>
        </div>
      </div>
    </div>
  );
}
