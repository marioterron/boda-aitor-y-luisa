import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { NavLinks } from "./nav-links";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 transition-all duration-300" />
            ) : (
              <Menu className="h-6 w-6 transition-all duration-300" />
            )}
          </button>

          {/* Center logo */}
          <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl md:text-2xl">
            AITOR & LUISA
          </h1>

          {/* Desktop navigation */}
          <NavLinks className="hidden items-center space-x-8 lg:flex" />

          {/* Right menu items */}
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
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-x-0 top-20 bottom-0 bg-white/95 transition-all duration-300 lg:hidden ${
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div
            className={`flex h-full flex-col transition-opacity duration-300 ${
              isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <NavLinks
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center space-y-12 text-2xl"
              />
            </div>
            <div className="mt-auto w-full p-8">
              <Button
                onClick={scrollToRSVP}
                variant="outline"
                size="sm"
                className="uppercase w-full"
              >
                RSVP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
