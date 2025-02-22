import { HeroImage } from "./hero-image";
import { Date } from "./date";
import { Tagline } from "./tagline";

export function MobileLayout() {
  return (
    <div className="space-y-16">
      <Date />
      <div className="w-full">
        <HeroImage src="/image-center.jpeg" alt="Main wedding photo" priority />
      </div>
      <Tagline />
      <div className="grid grid-cols-2 gap-4">
        <HeroImage src="/image-left.jpeg" alt="Wedding moment" />
        <HeroImage src="/image-right.jpeg" alt="Wedding moment" />
      </div>
    </div>
  );
}
