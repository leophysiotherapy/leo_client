import { gql } from "@apollo/client";



export const GetPatientAppointment = gql`query GetAllPhysioPatient($userId: ID!, $platform: platform, $status: status) {
  getAllPatientAppointment(userID: $userId, platform: $platform, status: $status) {
    date
    time
    status
    services
    amount
    appointmentID
    patients {
      profile {
        firstname
        lastname
      }
    
  }
  }
}`

export const getAllPatientAppointment = gql`query GetAllAppointment {
  getAllAppointment {
     appointmentID
    amount
    date
    link
    platform
    services
    status
    time
    patients {
      profile {
        firstname
        lastname
      }

  }
  }
}`

export const getAllAppointmentIDs = gql`query GetAllAppointmentID($appointmentId: ID!) {
  getAllAppointmentID(appointmentID: $appointmentId) {
    appointmentID
    amount
    date
    link
    platform
    services
    status
    time
    patients {
      email
      profile {
        phone
        firstname
        lastname
      }
  }
  }
}`

export const getAllAppointByPlatform = gql`query GetAppointmentByplatform($platform: platform) {
  getAppointmentByplatform(platform: $platform) {
    appointmentID
    date
    amount
    link
    platform
    services
    status
    time
    patients {
      profile {
        fullname
      }
    }
  }
}`


export const getFindSpecificDate = gql`query GetAppointmentByDateTime($platform: platform, $date: String!) {
  getAppointmentByDateTime(platform: $platform, date: $date) {
  appointmentID
    date
    amount
    link
    platform
    services
    status
    time
    patients {
      profile {
        fullname
      }
    }
  }
}`