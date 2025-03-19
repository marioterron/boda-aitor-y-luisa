export const WEDDING_DATE = new Date("2025-09-06T12:00:00");

export const WEDDING_DETAILS = {
  couple: {
    person1: "Aitor",
    person2: "Luisa",
  },
  schedule: {
    ceremony: "17:00",
    cocktail: "18:00",
    dinner: "20:30",
    dancing: "23:00",
  },

  venue: {
    name: "La Joia",
    type: "Espai d'esdeveniments",
    location: "Llambilles",
    city: "Girona",
    country: "España",
  },
} as const;
