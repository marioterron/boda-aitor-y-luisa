import "./globals.css";
import type { Metadata } from "next";
import { WEDDING_DETAILS } from "@/constants/wedding";

const weddingDate = "2025-09-06";
const weddingDescription = `Join us in celebrating the wedding of ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2} on September 6th, 2025 at ${WEDDING_DETAILS.venue.name}, ${WEDDING_DETAILS.venue.city}, ${WEDDING_DETAILS.venue.country}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://boda-aitor-y-luisa.vercel.app"),
  title: {
    default: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
    template: `%s | ${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
  },
  description: weddingDescription,
  keywords: [
    "wedding",
    "celebration",
    "marriage",
    WEDDING_DETAILS.venue.city,
    WEDDING_DETAILS.venue.country,
    WEDDING_DETAILS.couple.person1,
    WEDDING_DETAILS.couple.person2,
  ],
  authors: [
    {
      name: `${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}`,
    },
  ],
  creator: `${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}`,
  publisher: `${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}`,
  openGraph: {
    type: "website",
    title: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
    description: weddingDescription,
    siteName: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}'s Wedding Invitation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
    description: weddingDescription,
    images: ["/images/og-image.jpg"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
              description: weddingDescription,
              startDate: `${weddingDate}T${WEDDING_DETAILS.schedule.ceremony}`,
              endDate: `${weddingDate}T23:59`,
              location: {
                "@type": "Place",
                name: WEDDING_DETAILS.venue.name,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: WEDDING_DETAILS.venue.city,
                  addressCountry: WEDDING_DETAILS.venue.country,
                },
              },
              organizer: {
                "@type": "Person",
                name: `${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2}`,
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
