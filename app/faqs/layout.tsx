import { Metadata } from "next";
import { WEDDING_DETAILS } from "@/constants/wedding";

export const metadata: Metadata = {
  title: "FAQs",
  description: `Important information about ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}'s wedding including dress code, venue details, and frequently asked questions.`,
  openGraph: {
    title: "FAQs",
    description: `Important information about ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}'s wedding including dress code, venue details, and frequently asked questions.`,
    images: ["/images/dress-code.jpg"],
  },
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
