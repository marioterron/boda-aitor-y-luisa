"use client";

import { useRouter } from "next/navigation";

import Footer from "@/components/wedding/footer";
import Navigation from "@/components/wedding/navigation";
import OurStory from "@/components/wedding/our-story";

export default function OurStoryPage() {
  const router = useRouter();

  const redirectToMainPage = () => router.push("/");

  return (
    <>
      <Navigation onScrollToRSVP={redirectToMainPage} />
      <main className="min-h-screen">
        <OurStory />
      </main>
      <Footer hideBorder />
    </>
  );
}
