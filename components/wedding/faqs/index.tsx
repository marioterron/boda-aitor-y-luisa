import { useTranslations } from "next-intl";
import { faqData, FAQItem } from "./constants";

export default function FAQs() {
  const t = useTranslations("faqs");

  return (
    <>
      <div className="relative">
        <div className="h-[400px] bg-[url('/images/faqs.jpg')] bg-cover bg-center grayscale">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative">
            <h1 className="text-5xl md:text-6xl font-serif text-white text-center uppercase">
              FREQUENTLY ASKED
              <br />
              QUESTIONS
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
          {faqData.map((section: FAQItem) => (
            <div key={section.categoryKey} className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif uppercase">
                {t(`categories.${section.categoryKey}.title`)}
              </h2>
              <div className="space-y-8">
                {section.questionKeys.map((questionKey: string) => (
                  <div key={questionKey} className="space-y-2">
                    <h3 className="text-sm font-medium tracking-wide uppercase">
                      {t(
                        `categories.${section.categoryKey}.questions.${questionKey}.question`
                      )}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(
                        `categories.${section.categoryKey}.questions.${questionKey}.answer`
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
