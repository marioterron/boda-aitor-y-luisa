import { OurStory } from "@/components/wedding/our-story";
import dynamic from "next/dynamic";
import Footer from "@/components/wedding/footer";

const Navigation = dynamic(() => import("@/components/wedding/navigation"), {
  ssr: true,
});

export default function OurStoryPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <OurStory />
      </main>
      <Footer />
    </>
  );
}
