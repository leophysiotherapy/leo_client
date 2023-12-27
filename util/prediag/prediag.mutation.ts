import { gql } from "@apollo/client";


export const CreatePreDiagForm = gql`mutation CreatePreDiagForm($userId: ID!, $prediag: prediaginput) {
    createPreDiagForm(userID: $userId, prediag: $prediag) {
      prediagnosticID
      age
      sex
      time
      date
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
    }
  }`


export const DeletePreForm = gql`mutation DeletePreDiagForm($prediagnosticId: ID!) {
  deletePreDiagForm(prediagnosticID: $prediagnosticId) {
    prediagnosticID
  }
}`