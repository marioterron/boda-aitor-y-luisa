"use client";

import { useRouter } from "next/navigation";

import Navigation from "@/components/wedding/navigation";
import Footer from "@/components/wedding/footer";
import FAQs from "@/components/wedding/faqs";

export default function FAQsPage() {
  const router = useRouter();

  const redirectToMainPage = () => router.push("/");

  return (
    <>
      <Navigation onScrollToRSVP={redirectToMainPage} />
      <main className="min-h-screen">
        <FAQs />
        <Footer hideBorder />
      </main>
    </>
  );
}
