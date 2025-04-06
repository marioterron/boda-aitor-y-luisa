import { Metadata } from "next";

import { WEDDING_DETAILS } from "@/constants/wedding";
import messages from "@/messages/es.json";

const couple = `${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`;
const metadataMessages = messages.metadata;
const commonMessages = messages.common;

export const metadata: Metadata = {
  title: metadataMessages.faqs.title,
  description: metadataMessages.faqs.description.replace("{couple}", couple),
  openGraph: {
    title: metadataMessages.faqs.title,
    description: metadataMessages.faqs.description.replace("{couple}", couple),
    images: [
      {
        url: "/images/open-graph/dress-code.jpg",
        width: 1140,
        height: 1710,
        alt: commonMessages.images.dressCode,
      },
    ],
  },
};

export default metadata;
