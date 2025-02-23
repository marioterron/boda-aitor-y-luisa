export const WEDDING_DATE = new Date("2025-09-06T12:00:00");

export const WEDDING_DETAILS = {
  couple: {
    person1: "Aitor",
    person2: "Luisa",
  },
  schedule: {
    ceremony: "12:00",
    cocktail: "13:00",
    dinner: "14:00",
    dancing: "18:00",
  },

  venue: {
    name: "Dunhaven Castle",
    type: "Hotel & Restaurant",
    location: "Glencairn Road County",
    city: "Kerry",
    country: "Ireland",
  },
} as const;
