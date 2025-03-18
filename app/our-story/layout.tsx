import { Metadata } from "next";
import { WEDDING_DETAILS } from "@/constants/wedding";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The story of how ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2} met and fell in love. Join us in celebrating our wedding journey.`,
  openGraph: {
    title: "Our Story",
    description: `The story of how ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2} met and fell in love. Join us in celebrating our wedding journey.`,
    images: ["/images/story/main.jpg"],
  },
};

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
