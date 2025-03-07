export interface FAQItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export const faqData: FAQItem[] = [
  {
    category: "DRESS CODE",
    questions: [
      {
        question: "WHAT DOES 'FORMAL ATTIRE' MEAN?",
        answer:
          "Formal attire typically includes elegant gowns, suits, tuxedos, or cocktail dresses. Think of it as dressing for a special occasion, similar to what you might wear to a sophisticated evening event.",
      },
      {
        question: "ARE SPECIFIC COLORS REQUIRED FOR THE DRESS CODE?",
        answer:
          "No, there are no specific color requirements. Feel free to express your personal style and wear colors that make you feel comfortable and confident.",
      },
    ],
  },
  {
    category: "CHILDREN",
    questions: [
      {
        question: "ARE CHILDREN WELCOME AT THE WEDDING?",
        answer:
          "Absolutely! We welcome children and have arranged for a designated kids' area with entertainment to ensure they have a great time during the celebration.",
      },
      {
        question: "IS THERE A SPECIFIC AGE LIMIT FOR CHILDREN ATTENDING?",
        answer:
          "There's no age limit for children. We want the whole family to be a part of our special day, from the littlest ones to the oldest.",
      },
    ],
  },
  {
    category: "FOOD OPTIONS",
    questions: [
      {
        question: "DO YOU ACCOMMODATE DIETARY RESTRICTIONS?",
        answer:
          "Yes, we're committed to ensuring that all our guests have a delightful dining experience. We offer vegan, vegetarian, and gluten-free food options. Please indicate your dietary preferences in your RSVP, and we'll make sure you're catered to accordingly.",
      },
      {
        question: "CAN WE REQUEST SPECIFIC DISHES FOR DIETARY RESTRICTIONS?",
        answer:
          "While we'll have a variety of dishes to accommodate different dietary needs, if you have specific requests or severe allergies, please let us know in advance, and we'll do our best to accommodate them.",
      },
    ],
  },
];
