import { HeroImage } from "./hero-image";
import { Date } from "./date";
import { Tagline } from "./tagline";

export function MobileLayout() {
  return (
    <div className="space-y-16">
      <Date />
      <div className="w-full">
        <HeroImage
          src="/placeholder.svg?height=800&width=600"
          alt="Main wedding photo"
          priority
        />
      </div>
      <Tagline />
      <div className="grid grid-cols-2 gap-4">
        <HeroImage
          src="/placeholder.svg?height=400&width=300"
          alt="Wedding moment"
        />
        <HeroImage
          src="/placeholder.svg?height=400&width=300"
          alt="Wedding moment"
        />
      </div>
    </div>
  );
}
