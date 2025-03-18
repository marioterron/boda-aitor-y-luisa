import { Metadata } from "next";
import { WEDDING_DETAILS } from "@/constants/wedding";

export const homeMetadata: Metadata = {
  title: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding - September 6th, 2025`,
  description: `You're invited to celebrate the wedding of ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2} on September 6th, 2025 at ${WEDDING_DETAILS.venue.name}. Join us for this special celebration of love in ${WEDDING_DETAILS.venue.city}, ${WEDDING_DETAILS.venue.country}.`,
  openGraph: {
    title: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
    description: `Join us in celebrating the wedding of ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2} on September 6th, 2025 at ${WEDDING_DETAILS.venue.name}, ${WEDDING_DETAILS.venue.city}, ${WEDDING_DETAILS.venue.country}.`,
    images: [
      {
        url: "/images/image-center.jpg",
        width: 1200,
        height: 630,
        alt: `${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}'s Wedding Invitation`,
      },
      {
        url: "/images/location.jpg",
        width: 1200,
        height: 630,
        alt: `${WEDDING_DETAILS.venue.name} - Wedding Venue`,
      },
    ],
  },
  keywords: [
    "wedding invitation",
    "wedding celebration",
    "wedding ceremony",
    WEDDING_DETAILS.venue.name,
    WEDDING_DETAILS.venue.city,
    WEDDING_DETAILS.venue.country,
    WEDDING_DETAILS.couple.person1,
    WEDDING_DETAILS.couple.person2,
    "wedding venue",
    "wedding details",
  ],
};
