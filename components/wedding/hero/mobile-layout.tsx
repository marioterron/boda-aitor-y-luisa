import { useTranslations } from "next-intl";
import { HeroImage } from "./hero-image";
import { Date } from "./date";
import { Tagline } from "./tagline";

export function MobileLayout() {
  const t = useTranslations("common.images.wedding");

  return (
    <div className="space-y-16">
      <Date />
      <div className="w-full">
        <HeroImage src="/images/image-center.jpg" alt={t("main")} priority />
      </div>
      <Tagline />
      <div className="grid grid-cols-2 gap-4">
        <HeroImage src="/images/image-left.jpeg" alt={t("moment")} />
        <HeroImage src="/images/image-right.jpeg" alt={t("moment")} />
      </div>
    </div>
  );
}
