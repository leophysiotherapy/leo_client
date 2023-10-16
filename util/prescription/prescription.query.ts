import { gql } from "@apollo/client";

export const GetAllPrescription = gql`query GetAllPrescription {
    getAllPrescription {
      prescriptionID
    createdAt
    prescription
    patient {
      profile {
        fullname
      }
    }
    }
  }`


export const GetPrescriptionById = gql`query GetAllPrescription($prescriptionId: ID!) {

  getPrescriptionsById(prescriptionID: $prescriptionId) {
    prescription
    prescriptionID
    patient {
      profile {
        firstname
        lastname
      }
    }
  }
}`


export const GetFindPrescriptions = gql`query GetAllPrescription($search: String!) {
  getFindPrescription(search: $search) {
    prescriptionID
    prescription
    createdAt
    patient {
      profile {
        fullname
      }
    }
  }
}`