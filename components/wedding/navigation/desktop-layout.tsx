import { Button } from "@/components/ui/button";
import { NavLinks } from "./nav-links";

interface DesktopLayoutProps {
  scrollToRSVP: () => void;
}

export function DesktopLayout({ scrollToRSVP }: DesktopLayoutProps) {
  return (
    <>
      <NavLinks className="hidden items-center space-x-8 lg:flex" />
      <div className="hidden items-center lg:flex">
        <Button
          onClick={scrollToRSVP}
          variant="outline"
          size="sm"
          className="uppercase"
        >
          RSVP
        </Button>
      </div>
    </>
  );
}
