import { HeroImage } from "./hero-image";
import { Date } from "./date";
import { Tagline } from "./tagline";

export function DesktopLayout() {
  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-8 md:gap-16">
        <div className="w-full">
          <HeroImage
            src="/placeholder.svg?height=400&width=300"
            alt="Wedding moment"
          />
        </div>
        <div className="relative w-full">
          <Date />
          <HeroImage
            src="/placeholder.svg?height=800&width=600"
            alt="Main wedding photo"
            priority
          />
        </div>
        <div className="w-full">
          <HeroImage
            src="/placeholder.svg?height=400&width=300"
            alt="Wedding moment"
          />
        </div>
      </div>
      <Tagline />
    </>
  );
}
