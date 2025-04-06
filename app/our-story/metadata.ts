import { Metadata } from "next";

import { WEDDING_DETAILS } from "@/constants/wedding";
import messages from "@/messages/es.json";

const couple = `${WEDDING_DETAILS.couple.groom} y ${WEDDING_DETAILS.couple.bride}`;
const metadataMessages = messages.metadata;
const commonMessages = messages.common;

export const metadata: Metadata = {
  title: metadataMessages.ourStory.title,
  description: metadataMessages.ourStory.description.replace(
    "{couple}",
    couple
  ),
  openGraph: {
    title: metadataMessages.ourStory.title,
    description: metadataMessages.ourStory.description.replace(
      "{couple}",
      couple
    ),
    images: [
      {
        url: "/images/open-graph/our-story.jpg",
        width: 1200,
        height: 800,
        alt: commonMessages.images.couple.mainImage,
      },
    ],
  },
};

export default metadata;
