import { useTranslations } from "next-intl";

import { WEDDING_DETAILS } from "@/constants/wedding";
import { formatTime } from "@/lib/utils/date";
import { OptimizedImage } from "@/components/ui/optimized-image";

export default function Schedule() {
  const t = useTranslations("schedule");
  const commonT = useTranslations("common.images");
  const { schedule } = WEDDING_DETAILS;

  const scheduleItems = [
    { time: schedule.ceremony, key: "ceremony" },
    { time: schedule.cocktail, key: "cocktail" },
    { time: schedule.dinner, key: "dinner" },
    { time: schedule.dancing, key: "dancing" },
  ];

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/schedule.jpg"
          alt={commonT("wedding.fabric")}
          className="h-full w-full object-cover grayscale"
          width={800}
          height={1200}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 w-full px-4 py-32 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="mb-8 text-sm uppercase tracking-[0.2em]">
            {t("title.preHeading")}
          </h3>
          <h2 className="mb-24 font-serif text-5xl uppercase leading-tight md:text-6xl">
            {t("title.heading")}
          </h2>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
            {scheduleItems.map(({ time, key }) => (
              <div key={key}>
                <h4 className="mb-4 font-serif text-4xl">{formatTime(time)}</h4>
                <p className="text-sm uppercase tracking-[0.2em]">
                  {t(`events.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
