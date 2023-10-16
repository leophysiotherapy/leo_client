import { gql } from "@apollo/client";



export const GetAllInventory = gql`query GetAllEquipment($inventories: inventory) {
  getAllEquipment(inventories: $inventories) {
    quantity
    name
    expireDate
    equipmentID
    description
  }
}`


export const GetAllInventoryBySearch = gql`query GetInventoryBySearch($search: String!) {
    getInventoryBySearch(search: $search) {
      name
      quantity
      expireDate
      equipmentID
      description
    }
  }`


export const GetNumberofExpiration = gql`query GetInventoryExpiration {
  getInventoryExpiration 
}`