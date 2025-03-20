import { useIsMobile } from "@/hooks/use-is-mobile";
import { useTranslations } from "next-intl";
import { MobileLayout } from "./mobile-layout";
import { DesktopLayout } from "./desktop-layout";

export default function Hero() {
  const isMobile = useIsMobile();
  const t = useTranslations("common.aria");

  return (
    <section
      className="py-16 md:py-32 px-4"
      aria-label={t("weddingAnnouncement")}
    >
      <div className="relative max-w-[90rem] mx-auto px-4">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </section>
  );
}
