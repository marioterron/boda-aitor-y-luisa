import "./globals.css";
import type { Metadata } from "next";
import { WEDDING_DETAILS } from "@/constants/wedding";

export const metadata: Metadata = {
  title: `${WEDDING_DETAILS.couple.person1} & ${WEDDING_DETAILS.couple.person2}'s Wedding`,
  description: `Join us in celebrating our special day - September 06, 2025`,
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
      </head>
      <body>{children}</body>
    </html>
  );
}
