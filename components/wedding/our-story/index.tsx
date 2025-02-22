import { OurStoryHero } from "./our-story-hero";
import { OurStoryContent } from "./our-story-content";

export function OurStory() {
  return (
    <div className="w-full">
      <OurStoryHero />
      <OurStoryContent />
    </div>
  );
}
