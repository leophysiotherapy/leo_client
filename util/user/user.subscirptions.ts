import { gql } from '@apollo/client'


export const UserSubscriptions = gql`subscription Subscription($role: roles) {
    UserSubscriptions(role: $role) {
      email
    }
  }`