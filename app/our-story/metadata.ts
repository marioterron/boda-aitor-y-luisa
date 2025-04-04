import { Metadata } from "next";

import { WEDDING_DETAILS } from "@/constants/wedding";
import messages from "@/messages/es.json";

const couple = `${WEDDING_DETAILS.couple.groom} and ${WEDDING_DETAILS.couple.bride}`;
const metadataMessages = messages.metadata;

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
    images: ["/images/story/main.jpeg"],
  },
};

export default metadata;
