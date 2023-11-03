import { gql } from "@apollo/client";



export const GetAllDiagnosis = gql`query Query {
    getAllDiagnosis {
      diagnosisID
      diagnosis
      createdAt
    }
  }`


export const GetDiagnosisID = gql`query GetDiagnosisID($diagnosisId: ID!) {
    getDiagnosisID(diagnosisID: $diagnosisId) {
      diagnosis
      diagnosisID
      createdAt
      patient {
        email
        profile {
          fullname
          phone
        }
      }
    }
  }`