import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { MobileLayout } from "./mobile-layout";
import { DesktopLayout } from "./desktop-layout";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useScrollLock(isMenuOpen);

  const scrollToRSVP = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const rsvpSection = document.getElementById("rsvp-section");
      rsvpSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav
      className={`z-50 w-full bg-white/95 backdrop-blur-sm transition-all duration-300 ${
        isMenuOpen ? "fixed bottom-0 left-0 right-0 top-0" : "h-20"
      }`}
    >
      <div className="mx-auto px-4">
        <div className="relative flex h-20 items-center justify-between">
          <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl md:text-2xl">
            AITOR & LUISA
          </h1>

          {isMobile ? (
            <MobileLayout
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              scrollToRSVP={scrollToRSVP}
            />
          ) : (
            <DesktopLayout scrollToRSVP={scrollToRSVP} />
          )}
        </div>
      </div>
    </nav>
  );
}
