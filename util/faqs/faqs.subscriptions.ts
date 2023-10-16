import { gql } from "@apollo/client";


export const FAQSubscriptions = gql`subscription Subscription {
    FAQsSubscriptions {
      faqs
      faqsID
      createdAt
      answer
    }
  }`