import { gql } from '@apollo/client'


export const CreateAppointment = gql`mutation Mutation($appointment: appointmentInput, $serviceId: ID!, $platform: platform, $userId: ID!) {
    createAppointment(appointment: $appointment, serviceID: $serviceId, platform: $platform, userID: $userId) {
      date
      link
      platform
      services {
        service
      }
      status
      time
    }
  }`