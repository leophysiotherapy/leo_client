import { gql } from "@apollo/client";



export const CreateEquipment = gql`mutation CreateEquipment(
    $userId: ID!
    $equipment: equipmentInput
    $inventory: inventory
  ) {
    createEquipment(
      userID: $userId
      equipment: $equipment
      inventory: $inventory
    ) {
      equipmentID
      expireDate
      name
      quantity
      description
    }
  }
  `


export const DeletEquipment = gql`mutation Mutation($equipmentId: ID!) {
  deleteEquipment(equipmentID: $equipmentId) {
    equipmentID
  }
}`


export const UpdateEquipment = gql`mutation Mutation($equipmentId: ID!, $equipment: equipmentInput) {
  updateEquipment(equipmentID: $equipmentId, equipment: $equipment) {
    equipmentID
  }
}
`