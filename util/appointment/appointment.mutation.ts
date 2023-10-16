import { gql } from '@apollo/client'


export const CreateAppointment = gql`mutation Mutation($appointment: appointmentInput, $userId: ID!, $platform: platform, $end: String!) {
  createAppointment(appointment: $appointment, userID: $userId, platform: $platform, end: $end) {
    date
    link
  }
}`


export const CanceledAppointment = gql`mutation Mutation($appointmentId: ID!) {
  canceledAppointment(appointmentID: $appointmentId) {
    appointmentID
  }
}`


export const DeleteAppointment = gql`mutation Mutation($appointmentId: ID!) {
  deleteAppointment(appointmentID: $appointmentId) {
    appointmentID
  }
}`

export const UpdateAppointmentSession = gql`mutation Mutation(
  $appointmentId: ID!
  $appointment: appointmentInput
  $platform: platform
  $link: String
  $status: status
) {
  updateAppointmentSession(
    appointmentID: $appointmentId
    appointment: $appointment
    platform: $platform
    link: $link
    status: $status
  ) {
    appointmentID
    date
    link
  }
}

`