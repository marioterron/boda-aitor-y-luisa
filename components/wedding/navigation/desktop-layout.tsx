import { Button } from "@/components/ui/button";
import { NavLinks } from "./nav-links";

interface DesktopLayoutProps {
  scrollToRSVP: () => void;
}

export function DesktopLayout({ scrollToRSVP }: DesktopLayoutProps) {
  return (
    <>
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
    </>
  );
}
