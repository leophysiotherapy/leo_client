import { gql } from "@apollo/client"


export const GetAllService = gql`query Query {
    getAllServcie {
      service
      serviceID
    }
  }`