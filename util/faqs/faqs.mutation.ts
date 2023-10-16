import { gql } from "@apollo/client";


export const DeleteMyFAQs = gql`mutation DeleteFAQs($faqsId: ID!) {
    deleteFAQs(faqsID: $faqsId) {
      faqs
      faqsID
    }
  }`


export const UpdateMyFAQs = gql`mutation UpdateFAQs($faqs: faqsInput!, $faqsId: ID!) {
  updateFAQs(faqs: $faqs, faqsID: $faqsId) {
    faqsID
    faqs
    answer
  }
}`

export const CreateMyFAQs = gql`mutation CreateFAQs($faqs: faqsInput!, $userId: ID!) {
  createFAQs(faqs: $faqs, userID: $userId) {
    answer
    faqsID
    faqs
  }
}`