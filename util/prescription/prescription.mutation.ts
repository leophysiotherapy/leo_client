import { gql } from "@apollo/client";


export const DeletePrescription = gql`mutation DeletePrescrpition($prescriptionId: ID!) {
    deletePrescrpition(prescriptionID: $prescriptionId) {
      prescriptionID
      prescription
      createdAt
      updatedAt
    }
  }`