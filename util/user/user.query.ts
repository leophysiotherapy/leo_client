import { gql } from "@apollo/client";


export const getAllPhysioId = gql`query Query($userId: ID!) {
    getAllPhysioId(userID: $userId) {
      email
      profile {
        firstname
        lastname
        phone
      }
      diagnosis {
      diagnosisID
      diagnosis
    }
    prescription {
      prescriptionID
      prescription
    }
    }
  }`



export const GetAllPhysioUserByRole = gql`query Query($role: roles, $take: Int!, $limit: Int!) {
  getPhysioUserByRole(role: $role, take: $take, limit: $limit) {
    userID
    email
    password
    profile {
      avatar {
        avatar
      }
      firstname
      lastname
      expertise
      phone
      emergencyPhone
      designation
    }
    diagnosis {
      diagnosisID
      diagnosis
    }
    prescription {
      prescriptionID
      prescription
    }
    appointment {
      date
      time
    }
  }
}
`


export const GetAllPhysioSearchByRole = gql`query GetSearchuserByRole($search: String!, $role: roles) {
  getSearchuserByRole(search: $search, role: $role) {
    userID
    email
    profile {
      avatar{ 
        avatar
      }
      firstname
      lastname
      phone
      emergencyPhone
      designation
      expertise
    }
    diagnosis {
      diagnosisID
      diagnosis
    }
    prescription {
      prescriptionID
      prescription
    }
    appointment {
      date
      time
    }
  }
}`

export const UpdatestaffUpdateProfile = gql`mutation Mutation($userId: ID!, $user: userInput) {
  updateStaffAccount(userID: $userId, user: $user) {
    userID
    email
  }
}`