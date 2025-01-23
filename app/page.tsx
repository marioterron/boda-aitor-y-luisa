"use client";

import Navigation from "../components/Navigation";
import Schedule from "../components/Schedule";
import Location from "../components/Location";
import Countdown from "../components/Countdown";
import Registry from "../components/Registry";
import DressCode from "../components/DressCode";
import Rsvp from "../components/Rsvp";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-32 px-4">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-16">
            <div className="w-full">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Wedding moment"
                className="w-full aspect-[3/4] object-cover grayscale"
              />
            </div>

            <div className="relative">
              <h2 className="font-serif text-8xl absolute w-full text-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                14 <span className="mx-4">•</span> 07{" "}
                <span className="mx-4">•</span> 2025
              </h2>
              <img
                src="https://images.squarespace-cdn.com/content/v1/66cb369992e60664dc8a4f5e/1724593821106-2KDG6KT1913A9KO9PSHK/olga-solodilova-Ty1NNPJUsW8-unsplash.jpg"
                alt="Main wedding photo"
                className="w-full aspect-[3/4] object-cover grayscale"
              />
            </div>

            <div className="w-full">
              <img
                src="/placeholder.svg?height=400&width=300"
                alt="Wedding moment"
                className="w-full aspect-[3/4] object-cover grayscale"
              />
            </div>
          </div>

          <p className="text-center uppercase tracking-widest text-sm mt-16">
            JOIN US AS WE EMBARK ON A JOURNEY OF LOVE,
            <br />
            JOY, AND ETERNAL HAPPINESS
          </p>
        </div>
      </section>
      <Schedule />
      <Location />
      <Countdown />
      <section className="py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 py-20 px-4 max-w-7xl mx-auto">
          <Registry />
          <DressCode />
        </div>
      </section>
      <Rsvp />
      <Footer />
    </main>
  );
}
