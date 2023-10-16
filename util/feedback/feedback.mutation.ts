import { gql } from "@apollo/client";


export const CreateMyFeedback = gql`mutation Mutation(
    $feedback: String!
    $userId: ID!
    $rating: Int!
    $appointmentId: ID!
  ) {
    createMyFeedback(
      feedback: $feedback
      userID: $userId
      rating: $rating
      appointmentID: $appointmentId
    ) {
      feedback
      feedbackID
      rating
    }
  }`


export const DeleteMyFeedback = gql`mutation Mutation($feedbackId: ID!) {
  deleteMyFeedback(feedbackID: $feedbackId) {
    createdAt
    feedback
    feedbackID
  }
}`