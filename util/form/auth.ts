
import { gql } from '@apollo/client'
export const LoginUser = gql`mutation Mutation($email: ID!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }`


export const RegisterUser = gql`mutation CreatePatientAccount($user: userInput) {
  createPatientAccount(user: $user) {
    email
    createdAt
    verified
  }
}`


export const VerifiedAccount = gql`mutation UpdateUserVerifiedAcc($email: EmailAddress!) {
  updateUserVerifiedAcc(email: $email) {
    email
    password
  }
}`

export const ResetPassword = gql`mutation ResetUserPassword($email: EmailAddress!, $password: String!, $retype: String!) {
  resetUserPassword(email: $email, password: $password, retype: $retype) {
    email
  }
}`