import { HeroImage } from "./hero-image";
import { Date } from "./date";
import { Tagline } from "./tagline";
import { useTranslations } from "next-intl";

export function DesktopLayout() {
  const t = useTranslations("common.images.wedding");

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-8 md:gap-16">
        <div className="w-full">
          <HeroImage src="/images/image-left.jpeg" alt={t("moment")} />
        </div>
        <div className="relative w-full">
          <Date />
          <HeroImage src="/images/image-center.jpg" alt={t("main")} priority />
        </div>
        <div className="w-full">
          <HeroImage src="/images/image-right.jpeg" alt={t("moment")} />
        </div>
      </div>
      <Tagline />
    </>
  );
}
