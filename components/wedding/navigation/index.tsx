"use client";

import Link from "next/link";
import { useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import smoothScrollTo from "@/utils/smoothScrollTo";
import { DesktopLayout } from "./desktop-layout";
import { MobileLayout } from "./mobile-layout";

export default function Navigation({
  onScrollToRSVP,
}: {
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
      className={`z-50 w-full bg-white/95 backdrop-blur-sm transition-all duration-300 ${
        isMenuOpen ? "fixed bottom-0 left-0 right-0 top-0" : "h-20"
      }`}
    >
      <div className="mx-auto px-4">
        <div className="relative flex h-20 items-center justify-between">
          <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl md:text-2xl">
            <Link href="/">AITOR & LUISA</Link>
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
