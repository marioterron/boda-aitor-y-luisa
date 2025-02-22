import { HeroImage } from "./hero-image";
import { Date } from "./date";
import { Tagline } from "./tagline";

export function DesktopLayout() {
  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_1fr] items-center gap-8 md:gap-16">
        <div className="w-full">
          <HeroImage src="image-left.jpeg" alt="Wedding moment" />
        </div>
        <div className="relative w-full">
          <Date />
          <HeroImage
            src="/image-center.jpeg"
            alt="Main wedding photo"
            priority
          />
        </div>
        <div className="w-full">
          <HeroImage src="/image-right.jpeg" alt="Wedding moment" />
        </div>
      </div>
      <Tagline />
    </>
  );
}
