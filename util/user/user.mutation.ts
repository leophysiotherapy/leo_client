import { gql } from "@apollo/client";


export const UpdateUserPassword = gql`
mutation Mutation($userId: ID!, $current: String!, $newpass: String!) {
  updatePassword(userID: $userId, current: $current, newpass: $newpass) {
    email
  }
}
`

export const UpdateContactNumber = gql`mutation UpdateContactNumber($userId: ID!, $phone: PhoneNumber!) {
  updateContactNumber(userID: $userId, phone: $phone) {
    profileID
    phone
  }
}`