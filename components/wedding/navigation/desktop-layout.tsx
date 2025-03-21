import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { WEDDING_DETAILS } from "@/constants/wedding";
import { NavLinks } from "./nav-links";

interface DesktopLayoutProps {
  scrollToRSVP: () => void;
}

export function DesktopLayout({ scrollToRSVP }: DesktopLayoutProps) {
  const t = useTranslations("navigation");

  return (
    <div className="hidden md:block mx-auto px-4">
      <div className="relative flex h-20 items-center justify-between">
        <h1 className="uppercase absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xl md:text-2xl">
          <Link href="/">
            {t("home", {
              groom: WEDDING_DETAILS.couple.groom,
              bride: WEDDING_DETAILS.couple.bride,
            })}
          </Link>
        </h1>
        <NavLinks className="flex items-center space-x-8 " />
        <div className="flex items-center">
          <Button
            onClick={scrollToRSVP}
            variant="outline"
            size="sm"
            className="uppercase"
          >
            {t("rsvp")}
          </Button>
        </div>
      </div>
    </div>
  );
}
