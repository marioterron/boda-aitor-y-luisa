"use client";

import {
  Navigation,
  Schedule,
  Location,
  Countdown,
  FAQs,
  DressCode,
  Rsvp,
  Footer,
  Hero,
} from "@/components/wedding";

export default function Home() {
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
