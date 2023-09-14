import { gql } from "@apollo/client";


export const GetAllFAQs = gql`query GetAllFAQs {
    getAllFAQs {
      faqsID
      faqs
      answer
    }
  }`