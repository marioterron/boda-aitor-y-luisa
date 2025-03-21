import { useTranslations } from "next-intl";
import { WEDDING_DETAILS } from "@/constants/wedding";
import { formatTime } from "@/utils/date";

export default function Schedule() {
  const t = useTranslations("schedule");
  const { schedule } = WEDDING_DETAILS;

  const scheduleItems = [
    { time: schedule.ceremony, key: "ceremony" },
    { time: schedule.cocktail, key: "cocktail" },
    { time: schedule.dinner, key: "dinner" },
    { time: schedule.dancing, key: "dancing" },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.squarespace-cdn.com/content/v1/66cb369992e60664dc8a4f5e/1724593821114-P83HW8YAAWROPH7G1KBQ/andres-molina-wIfDI58tCuU-unsplash.jpg"
          alt="Wedding fabric background"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 text-white py-32 px-4 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-sm uppercase tracking-[0.2em] mb-8">
            {t("title.preHeading")}
          </h3>
          <h2 className="font-serif text-5xl md:text-6xl mb-24 leading-tight uppercase">
            {t("title.heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {scheduleItems.map(({ time, key }) => (
              <div key={key}>
                <h4 className="font-serif text-4xl mb-4">{formatTime(time)}</h4>
                <p className="uppercase text-sm tracking-[0.2em]">
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
