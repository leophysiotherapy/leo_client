import { gql } from "@apollo/client";


export const GetAllFAQs = gql`query GetAllFAQs {
    getAllFAQs {
      faqsID
      faqs
      answer
    }
  }`


export const GetFindFaqsQuestion = gql`query Query($search: String!) {
  getFindFAQsQuestion(search: $search) {
    faqsID
    faqs
    answer
  }
}`