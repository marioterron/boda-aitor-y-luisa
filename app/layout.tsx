import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { WEDDING_DETAILS } from "@/constants/wedding";
import messages from "@/messages/es.json";
import { formatWeddingDate } from "@/utils/date";
import rootMetadata from "./metadata";

import "../styles/globals.css";

const weddingDate = formatWeddingDate("ISO");
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
              name: `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}'s Wedding`,
              description: rootMetadata.description,
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
                name: `${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride}`,
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

export const metadata: Metadata = rootMetadata;
