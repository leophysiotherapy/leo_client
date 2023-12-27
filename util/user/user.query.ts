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
      createdAt
    }
    prescription {
      prescriptionID
      prescription
      createdAt
    }
    }
  }`



export const GetAllPhysioUserByRole = gql`query GetPhysioUserByRole($take: Int!, $limit: Int!, $role: roles, $orders: sort!) {
  getPhysioUserByRole(take: $take, limit: $limit, role: $role, orders: $orders) {
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
      platform
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
      platform
    }
  }
}`

export const UpdatestaffUpdateProfile = gql`mutation UpdateStaffAccount($userId: ID!, $user: userInput, $file: Upload) {
  updateStaffAccount(userID: $userId, user: $user, file: $file) {
    userID
  }
}`