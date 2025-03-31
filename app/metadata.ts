import type { Metadata } from "next";

import { WEDDING_DETAILS } from "@/constants/wedding";
import { formatWeddingDate } from "@/utils/date";

const weddingDescription = `Join us in celebrating the wedding of ${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride} on ${formatWeddingDate()} at ${WEDDING_DETAILS.venue.name}, ${WEDDING_DETAILS.venue.location}, ${WEDDING_DETAILS.venue.city}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://aitoryluisa.com"),
  title: {
    default: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}'s Wedding`,
    template: `%s | ${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}'s Wedding`,
  },
  description: weddingDescription,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  keywords: [
    "wedding",
    "celebration",
    "marriage",
    WEDDING_DETAILS.venue.city,
    WEDDING_DETAILS.venue.country,
    WEDDING_DETAILS.couple.groom,
    WEDDING_DETAILS.couple.bride,
  ],
  authors: [
    {
      name: `${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride}`,
    },
  ],
  creator: `${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride}`,
  publisher: `${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride}`,
  openGraph: {
    type: "website",
    title: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}'s Wedding`,
    description: weddingDescription,
    siteName: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}'s Wedding`,
    locale: "en_US",
    images: [
      {
        url: "/images/image-center.jpg",
        width: 1200,
        height: 630,
        alt: `${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride}'s Wedding Invitation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}'s Wedding`,
    description: weddingDescription,
    images: ["/images/image-center.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default metadata;
