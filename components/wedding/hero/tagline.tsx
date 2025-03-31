import { useTranslations } from "next-intl";

export function Tagline() {
  const t = useTranslations("hero.tagline");

  return (
    <p className="text-center uppercase tracking-widest text-sm mt-16">
      {t("line1")}
      <br />
      {t("line2")}
    </p>
  );
}
