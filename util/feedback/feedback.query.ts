import { gql } from "@apollo/client";


export const FeedbackQueryByUser = gql`query Query($userId: ID!) {
    getAllFeedbackByUserId(userID: $userId) {
      creatdAt
      feedback
      feedbackID
      rating
    }
  }`


export const GetAllFeedbackQuery = gql`query Query {
  getAllFeedback {
    rating
    feedbackID
    feedback
    createdAt
    creatdAt
  
    users{ 
      profile {
          fullname
    }
    }
  }
}`

export const GetAllFeedbackById = gql`query Query($feedbackId: ID!) {
  getFeedbackById(feedbackID: $feedbackId) {
    feedbackID
    rating
    feedback
    createdAt
    creatdAt
    users{ 
      profile {
        fullname
      }
    }
  }
}`