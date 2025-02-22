"use client";

import { useEffect } from "react";

import {
  Countdown,
  DressCode,
  FAQs,
  Footer,
  Hero,
  Location,
  Navigation,
  Rsvp,
  Schedule,
} from "@/components/wedding";
import smoothScrollTo from "@/utils/smoothScrollTo";

export default function Home() {
  useEffect(() => {
    const shouldScrollToRSVP = localStorage.getItem("scrollToRSVP");

    if (shouldScrollToRSVP) {
      localStorage.removeItem("scrollToRSVP");

      setTimeout(() => {
        const rsvpSection = document.getElementById("rsvp-section");
        if (rsvpSection) {
          smoothScrollTo(rsvpSection);
        }
      }, 1000);
    }
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      <Navigation />
      <Hero />
      <Schedule />
      <Location />
      <Countdown />
      <section className="py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 py-20 px-4 max-w-7xl mx-auto">
          <DressCode />
          <FAQs />
        </div>
      </section>
      <Rsvp />
      <Footer />
    </main>
  );
}
