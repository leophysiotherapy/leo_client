import { gql } from "@apollo/client";


export const CreateOTP = gql`mutation Mutation($email: EmailAddress!) {
    createOTP(email: $email) {
      otp
    }
  }`

export const verifyOTP = gql`mutation VerifyOTP($otp: String!) {
    verifyOTP(otp: $otp) {
      otp
      otpID
    }
  }`