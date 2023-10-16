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


export const FindEmailAddress = gql`mutation Mutation($email: EmailAddress!) {
  findEmailAddress(email: $email) {
    email
  }
}`


export const CreateStaff = gql`mutation CreateStaffAccount($user: userInput, $file: Upload) {
  createStaffAccount(user: $user, file: $file) {
    userID
    email
    verified
  }
}`


export const CreateOldPatient = gql`mutation CreateOldPatient(
  $user: userInput
  $prescription: String!
  $diagnosis: String!
) {
  createOldPatient(
    user: $user
    prescription: $prescription
    diagnosis: $diagnosis
  ) {
    email
    userID
  }
}
`


export const UpdateOldPatient = gql`mutation UpdateOlPatient($diagnosis: String!, $prescription: String!, $user: userInput, $userId: ID!) {
  updateOlPatient(diagnosis: $diagnosis, prescription: $prescription, user: $user, userID: $userId) {
    email
  }
}`

export const DeleteUsers = gql`mutation Mutation($userId: ID!) {
  deleteUserAcc(userID: $userId) {
    userID
    email
  }
}`