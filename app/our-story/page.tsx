"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import Footer from "@/components/wedding/footer";
import { OurStory } from "@/components/wedding/our-story";

const Navigation = dynamic(() => import("@/components/wedding/navigation"), {
  ssr: true,
});

export default function OurStoryPage() {
  const router = useRouter();

  const redirectToMainPage = () => router.push("/");

  return (
    <>
      <Navigation onScrollToRSVP={redirectToMainPage} />
      <main className="min-h-screen">
        <OurStory />
      </main>
      <Footer />
    </>
  );
}
