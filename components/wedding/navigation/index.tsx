import { useState } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import cn from "@/lib/utils/cn";
import smoothScrollTo from "@/lib/utils/smoothScrollTo";
import { DesktopLayout } from "./desktop-layout";
import { MobileLayout } from "./mobile-layout";

export default function Navigation({
  className,
  onScrollToRSVP,
}: {
  className?: string;
  onScrollToRSVP?: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile(912);

  useScrollLock(isMenuOpen);

  const scrollToRSVP = () => {
    setIsMenuOpen(false);

    if (onScrollToRSVP) {
      localStorage.setItem("scrollToRSVP", "true");
      onScrollToRSVP();
      return;
    }

    const rsvpSection = document.getElementById("rsvp-section");
    if (rsvpSection) {
      smoothScrollTo(rsvpSection);
    }
  };

  return (
    <nav
      className={cn(
        "z-50 w-full bg-white/95 backdrop-blur-sm transition-all duration-300",
        isMenuOpen ? "fixed bottom-0 left-0 right-0 top-0" : "h-20",
        className
      )}
    >
      {isMobile ? (
        <MobileLayout
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollToRSVP={scrollToRSVP}
        />
      ) : (
        <DesktopLayout scrollToRSVP={scrollToRSVP} />
      )}
    </nav>
  );
}
