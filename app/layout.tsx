import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { WEDDING_DETAILS } from "@/constants/wedding";
import { formatWeddingDate } from "@/utils/date";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/es.json";

const weddingDate = formatWeddingDate("ISO");
const weddingDescription = `Join us in celebrating the wedding of ${WEDDING_DETAILS.couple.person1} and ${WEDDING_DETAILS.couple.person2} on ${formatWeddingDate()} at ${WEDDING_DETAILS.venue.name}, ${WEDDING_DETAILS.venue.location}, ${WEDDING_DETAILS.venue.city}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://aitoryluisa.com"),
  title: {
    default: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
    template: `%s | ${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
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
        url: "/images/image-center.jpg",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
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
      <body>
        <NextIntlClientProvider
          locale="es"
          messages={messages}
          timeZone="Europe/Madrid"
        >
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
