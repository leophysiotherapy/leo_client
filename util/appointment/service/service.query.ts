import { gql } from "@apollo/client";

export const getAllServicebById = gql`query GetServiceById($serviceId: ID!) {
    getServiceById(serviceID: $serviceId) {
      price
      service
    }
  }`