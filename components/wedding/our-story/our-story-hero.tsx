import { useTranslations } from "next-intl";

export function OurStoryHero() {
  const t = useTranslations("ourStory");

  return (
    <section className="w-full flex items-center justify-center py-16 md:py-32">
      <h1 className="uppercase font-serif text-5xl md:text-7xl text-gray-900">
        {t("title")}
      </h1>
    </section>
  );
}
