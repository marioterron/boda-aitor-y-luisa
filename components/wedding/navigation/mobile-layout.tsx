import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WEDDING_DETAILS } from "@/constants/wedding";
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
  const t = useTranslations("navigation");

  return (
    <div className="mx-auto w-full px-4">
      <div className="relative flex h-20 items-center justify-between">
        <h1 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl uppercase md:text-2xl">
          <Link href="/">
            {t("home", {
              groom: WEDDING_DETAILS.couple.groom,
              bride: WEDDING_DETAILS.couple.bride,
            })}
          </Link>
        </h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 transition-all duration-300" />
          ) : (
            <Menu className="h-6 w-6 transition-all duration-300" />
          )}
        </button>
        <div
          className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-white/95 transition-all duration-300 ${
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div
            className={`flex h-full flex-col justify-between transition-opacity duration-300 ${
              isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="flex flex-1 items-center justify-center">
              <NavLinks
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center space-y-12 text-2xl"
              />
            </div>
            <div className="flex w-full items-center justify-center p-8 sm:p-10">
              <Button
                onClick={() => {
                  scrollToRSVP();
                  setIsMenuOpen(false);
                }}
                variant="outline"
                size="lg"
                className="min-w-[200px] text-lg uppercase tracking-wider sm:min-w-[240px] sm:text-2xl"
              >
                {t("rsvp")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
