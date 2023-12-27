import { gql } from "@apollo/client";


export const FeedbackQueryByUser = gql`query GetAllFeedbackByUserId($userId: ID!) {
  getAllFeedbackByUserId(userID: $userId) {
    feedbackID
    therapistName
    date
    time
    question1
    question2
    question3
    question4
    question5
    question6
    question7
    question8
    feedback
    createdAt
    creatdAt
    rating
    users {
      profile {
        fullname
      }
    }
  }
}`


export const GetAllFeedbackQuery = gql`query Query {
  getAllFeedback {
    feedbackID
    therapistName
    date
    time
    question1
    question2
    question3
    question4
    question5
    question6
    question7
    question8
    feedback
    createdAt
    creatdAt
    rating
    users {
      profile {
        fullname
      }
    }
  }
}`

export const GetAllFeedbackById = gql`query GetFeedbackById($feedbackId: ID!) {
  getFeedbackById(feedbackID: $feedbackId) {
    feedbackID
    therapistName
    date
    time
    question1
    question2
    question3
    question4
    question5
    question6
    question7
    question8
    feedback
    createdAt
    creatdAt
    rating
    users {
      profile {
        fullname
      }
    }
  }
}`


export const GetSearchFeedback = gql`query GetSearchFeedback($search: String!) {
  getSearchFeedback(search: $search) {
    feedbackID
    therapistName
    date
    time
    question1
    question2
    question3
    question4
    question5
    question6
    question7
    question8
    feedback
    createdAt
    creatdAt
    rating
    users {
      profile {
        fullname
      }
    }
  }
}`