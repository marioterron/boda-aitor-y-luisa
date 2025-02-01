import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brian & Megan's Wedding",
  description: "Join us in celebrating our special day - July 14, 2025",
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
