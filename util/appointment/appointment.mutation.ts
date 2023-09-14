import { gql } from '@apollo/client'


export const CreateAppointment = gql`mutation Mutation($serviceId: ID!, $userId: ID!, $end: String!, $appointment: appointmentInput, $platform: platform) {
  createAppointment(serviceID: $serviceId, userID: $userId, end: $end, appointment: $appointment, platform: $platform) {
    date
    link
  }
}`