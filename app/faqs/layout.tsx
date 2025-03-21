import { Metadata } from "next";
import { WEDDING_DETAILS } from "@/constants/wedding";
import messages from "@/messages/es.json";

const couple = `${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride}`;
const metadataMessages = messages.metadata;

export const metadata: Metadata = {
  title: metadataMessages.faqs.title,
  description: metadataMessages.faqs.description.replace("{couple}", couple),
  openGraph: {
    title: metadataMessages.faqs.title,
    description: metadataMessages.faqs.description.replace("{couple}", couple),
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
