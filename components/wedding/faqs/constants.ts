export interface FAQItem {
  categoryKey: string;
  questionKeys: string[];
}

export const faqData: FAQItem[] = [
  {
    categoryKey: "dressCode",
    questionKeys: ["meaning", "colors"],
  },
  {
    categoryKey: "children",
    questionKeys: ["welcome", "ageLimit"],
  },
  {
    categoryKey: "foodOptions",
    questionKeys: ["dietary", "requests"],
  },
];
