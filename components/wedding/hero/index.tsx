import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLayout } from "./mobile-layout";
import { DesktopLayout } from "./desktop-layout";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 md:py-32 px-4" aria-label="Wedding announcement">
      <div className="relative max-w-[90rem] mx-auto px-4">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </section>
  );
}
