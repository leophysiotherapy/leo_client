import { gql } from "@apollo/client";


export const GetAllPreDiagForm = gql`query GetAllPreDiagnosticForm {
    getAllPreDiagnosticForm {
      prediagnosticID
      date
      createdAt
      user {
        profile {
          fullname
          firstname
          lastname
        }
      }
    }
  }`


export const GetAllPreDiagFormId = gql`query Query($prediagnosticId: ID!) {
  getPreDiagnositicFormId(prediagnosticID: $prediagnosticId) {
    age
    createdAt
    date
    prediagnosticID
    question1
    question10
    question11
    question12
    question13
    question14
    question15
    question16
    question2
    question3
    question4
    question5
    question6
    question7
    question9
    question8
    sex
    time
    updatedAt
    user {
      email
      profile {
        fullname
      }
    }
  }
}`


export const GetSearchPreDiagForm = gql`query GetSearchPreDiagnosticForm($search: String!) {
  getSearchPreDiagnosticForm(search: $search) {
    prediagnosticID
    age
    sex
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
    question9
    question10
    question11
    question12
    question13
    question14
    question15
    question16
    createdAt
    updatedAt
    user {
      profile {
        fullname
      }
    }
  }
}`