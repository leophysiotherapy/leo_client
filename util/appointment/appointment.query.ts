import { gql } from "@apollo/client";



export const GetPatientAppointment = gql`query Query($userId: ID!) {
    getAllPatientAppointment(userID: $userId) {
    appointmentID
      link
      date
      platform
      status
      time
      services {
        service
      }
    }
  }`