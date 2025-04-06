import type { Metadata } from "next";

import { WEDDING_DETAILS } from "@/constants/wedding";
import { formatWeddingDate } from "@/utils/date";

const weddingDescription = `Únete a nosotros en la celebración de la boda de ${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride} el ${formatWeddingDate()} en ${WEDDING_DETAILS.venue.name}, ${WEDDING_DETAILS.venue.location}, ${WEDDING_DETAILS.venue.city}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://aitoryluisa.com"),
  title: {
    default: `Boda de ${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`,
    template: `%s | Boda de ${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`,
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
      name: "Mario Terron",
      url: "https://github.com/marioterron",
    },
  ],
  creator: "Mario Terron",
  publisher: "Mario Terron",
  openGraph: {
    type: "website",
    title: `Boda de ${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`,
    description: weddingDescription,
    siteName: `Boda de ${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`,
    locale: "es_ES",
    images: [
      {
        url: "/images/open-graph/main.jpg",
        width: 1200,
        height: 783,
        alt: `Invitación a la boda de ${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Boda de ${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`,
    description: weddingDescription,
    images: ["/images/open-graph/main.jpg"],
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
