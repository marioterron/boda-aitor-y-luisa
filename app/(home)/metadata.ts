import { Metadata } from "next";

import { WEDDING_DETAILS } from "@/constants/wedding";
import { formatWeddingDate } from "@/utils/date";
import messages from "@/messages/es.json";

const couple = `${WEDDING_DETAILS.couple.groom} & ${WEDDING_DETAILS.couple.bride}`;
const metadataMessages = messages.metadata;

const metadata: Metadata = {
  title: metadataMessages.home.titleWithDate
    .replace("{couple}", couple)
    .replace("{date}", formatWeddingDate()),
  description: metadataMessages.home.fullDescription
    .replace("{couple}", couple)
    .replace("{date}", formatWeddingDate())
    .replace("{venue}", WEDDING_DETAILS.venue.name)
    .replace("{location}", WEDDING_DETAILS.venue.location),
  openGraph: {
    title: metadataMessages.home.titleWithoutDate.replace("{couple}", couple),
    description: metadataMessages.home.shortDescription
      .replace("{couple}", couple)
      .replace("{date}", formatWeddingDate())
      .replace("{venue}", WEDDING_DETAILS.venue.name)
      .replace("{location}", WEDDING_DETAILS.venue.location),
    images: [
      {
        url: "/images/image-center.jpg",
        width: 1200,
        height: 630,
        alt: metadataMessages.home.imageAlt.replace("{couple}", couple),
      },
      {
        url: "/images/location.jpg",
        width: 1200,
        height: 630,
        alt: metadataMessages.home.venueImageAlt.replace(
          "{venue}",
          WEDDING_DETAILS.venue.name
        ),
      },
    ],
  },
  keywords: [
    "wedding invitation",
    "wedding celebration",
    "wedding ceremony",
    WEDDING_DETAILS.venue.name,
    WEDDING_DETAILS.venue.city,
    WEDDING_DETAILS.venue.country,
    WEDDING_DETAILS.couple.groom,
    WEDDING_DETAILS.couple.bride,
    "wedding venue",
    "wedding details",
  ],
};

export default metadata;
