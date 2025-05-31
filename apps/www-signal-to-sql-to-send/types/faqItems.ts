import { ReactNode } from "react";

export interface FAQItem {
  question: string;
  answer: ReactNode;
  category?: string;
}
