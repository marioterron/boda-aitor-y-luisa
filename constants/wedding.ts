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
    name: "La Joia",
    type: "Espai d'esdeveniments",
    location: "Llambilles",
    city: "Girona",
    country: "España",
  },
} as const;
