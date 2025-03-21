"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { WEDDING_DATE } from "@/constants/wedding";

export default function Countdown() {
  const t = useTranslations("countdown");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.squarespace-cdn.com/content/v1/66cb369992e60664dc8a4f5e/1724593821123-2CHHZ2626ZJW67045DK3/tasha-marie-kCdjXEsCm2I-unsplash.jpg"
          alt="Floral background"
          className="h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 w-full px-4 py-32 text-white">
        <h3 className="mb-16 text-center text-lg uppercase tracking-wider">
          {t("title")}
        </h3>
        <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-8 px-4 md:grid md:grid-cols-4 md:px-24">
          <div className="text-center">
            <div className="mb-2 font-serif text-5xl md:text-7xl">
              {timeLeft.days}
            </div>
            <div className="text-sm uppercase tracking-widest">{t("days")}</div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-serif text-5xl md:text-7xl">
              {timeLeft.hours}
            </div>
            <div className="text-sm uppercase tracking-widest">
              {t("hours")}
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-serif text-5xl md:text-7xl">
              {timeLeft.minutes}
            </div>
            <div className="text-sm uppercase tracking-widest">
              {t("minutes")}
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-serif text-5xl md:text-7xl">
              {timeLeft.seconds}
            </div>
            <div className="text-sm uppercase tracking-widest">
              {t("seconds")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
