"use client";

import { useState, useEffect } from "react";
import { WEDDING_DATE } from "@/constants/wedding";

export default function Countdown() {
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
    <section className="relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.squarespace-cdn.com/content/v1/66cb369992e60664dc8a4f5e/1724593821123-2CHHZ2626ZJW67045DK3/tasha-marie-kCdjXEsCm2I-unsplash.jpg"
          alt="Floral background"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      <div className="relative z-10 text-white py-32 px-4 w-full">
        <h3 className="text-lg uppercase tracking-wider mb-16 text-center">
          LET THE COUNTDOWN BEGIN
        </h3>

        <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h4 className="font-serif text-7xl mb-4">{timeLeft.days}</h4>
            <p className="uppercase text-sm tracking-widest">Days</p>
          </div>
          <div className="text-center">
            <h4 className="font-serif text-7xl mb-4">{timeLeft.hours}</h4>
            <p className="uppercase text-sm tracking-widest">Hours</p>
          </div>
          <div className="text-center">
            <h4 className="font-serif text-7xl mb-4">{timeLeft.minutes}</h4>
            <p className="uppercase text-sm tracking-widest">Minutes</p>
          </div>
          <div className="text-center">
            <h4 className="font-serif text-7xl mb-4">{timeLeft.seconds}</h4>
            <p className="uppercase text-sm tracking-widest">Seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
}
