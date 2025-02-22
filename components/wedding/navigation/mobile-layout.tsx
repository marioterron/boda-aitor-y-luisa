import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./nav-links";

interface MobileLayoutProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  scrollToRSVP: () => void;
}

export function MobileLayout({
  isMenuOpen,
  setIsMenuOpen,
  scrollToRSVP,
}: MobileLayoutProps) {
  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="z-50"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 transition-all duration-300" />
        ) : (
          <Menu className="h-6 w-6 transition-all duration-300" />
        )}
      </button>

      <div
        className={`fixed inset-x-0 top-20 bottom-0 bg-white/95 transition-all duration-300 ${
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
          <div className="mx-auto p-8">
            <Button
              onClick={scrollToRSVP}
              variant="outline"
              size="lg"
              className="text-2xl uppercase"
            >
              RSVP
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
