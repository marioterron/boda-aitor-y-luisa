import { useTranslations } from "next-intl";
import { faqData, FAQItem } from "./constants";

export default function FAQs() {
  const t = useTranslations("faqs");

  return (
    <>
      <div className="relative">
        <div className="h-[400px] bg-[url('/images/faqs.jpg')] bg-cover bg-center grayscale">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative mx-auto flex h-full items-center justify-center px-4">
            <h1 className="text-center font-serif text-5xl uppercase text-white md:text-6xl">
              {t("title")}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-16 md:space-y-24">
          {faqData.map((section: FAQItem) => (
            <div key={section.categoryKey} className="space-y-8">
              <h2 className="font-serif text-3xl uppercase md:text-4xl">
                {t(`categories.${section.categoryKey}.title`)}
              </h2>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    {t(`categories.${section.categoryKey}.question`)}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {t(`categories.${section.categoryKey}.answer`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
