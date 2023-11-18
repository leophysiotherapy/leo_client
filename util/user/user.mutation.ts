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


export const CreateOldPatient = gql`mutation UpdateOlPatient(
  $diagnosis: String!
  $date: String!
  $user: userInput
  $time: String
  $platform: platform
) {
  createOldPatient(
    diagnosis: $diagnosis
    date: $date
    user: $user
    time: $time
    platform: $platform
  ) {
    email
  }
}

`


export const UpdateOldPatient = gql`mutation UpdateOlPatient($userId: ID!, $diagnosis: String!, $user: userInput) {
  updateOlPatient(userID: $userId, diagnosis: $diagnosis, user: $user) {
    userID
  }
}

`

export const DeleteUsers = gql`mutation Mutation($userId: ID!) {
  deleteUserAcc(userID: $userId) {
    userID
    email
  }
}`