import { gql } from "@apollo/client";


export const getAllPhysioId = gql`query Query($userId: ID!) {
    getAllPhysioId(userID: $userId) {
      email
      profile {
        firstname
        lastname
        phone
      }
    }
  }`