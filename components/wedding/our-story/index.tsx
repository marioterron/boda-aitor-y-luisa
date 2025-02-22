import { OurStoryHero } from "./our-story-hero";
import { OurStoryContent } from "./our-story-content";

export function OurStory() {
  return (
    <main className="min-h-screen w-full">
      <OurStoryHero />
      <OurStoryContent />
    </main>
  );
}
