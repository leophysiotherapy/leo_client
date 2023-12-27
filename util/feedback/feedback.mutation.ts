import { gql } from "@apollo/client";


export const CreateMyFeedback = gql`mutation CreateMyFeedback($feedback: String!, $therapistName: String!, $date: String!, $time: String!, $question1: String!, $question2: String!, $question3: String!, $question4: String!, $question5: String!, $question6: String!, $question7: String!, $question8: String!, $userId: ID!, $rating: Int!, $appointmentId: ID!) {
  createMyFeedback(feedback: $feedback, therapistName: $therapistName, date: $date, time: $time, question1: $question1, question2: $question2, question3: $question3, question4: $question4, question5: $question5, question6: $question6, question7: $question7, question8: $question8, userID: $userId, rating: $rating, appointmentID: $appointmentId) {
    feedbackID
  }
}`


export const DeleteMyFeedback = gql`mutation Mutation($feedbackId: ID!) {
  deleteMyFeedback(feedbackID: $feedbackId) {
    createdAt
    feedback
    feedbackID
  }
}`