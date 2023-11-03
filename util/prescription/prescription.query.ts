import { gql } from "@apollo/client";

export const GetAllPrescription = gql`query GetAllPrescription {
    getAllPrescription {
      prescription
    prescriptionID
    createdAt
    patient {
      email
      profile {
        fullname
        firstname
        lastname
        phone
      }
    }
    }
  }`


export const GetPrescriptionById = gql`query GetAllPrescription($prescriptionId: ID!) {

  getPrescriptionsById(prescriptionID: $prescriptionId) {
    prescription
    prescriptionID
    createdAt
    patient {
      email
      profile {
        firstname
        fullname
        lastname
        phone
      }
    }
  }
}`


export const GetFindPrescriptions = gql`query GetAllPrescription($search: String!) {
  getFindPrescription(search: $search) {
    prescription
    prescriptionID
    createdAt
    patient {
      email
      profile {
        firstname
        fulname
        lastname
        phone
      }
    }
  }
}`