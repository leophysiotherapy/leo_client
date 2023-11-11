import { gql } from "@apollo/client";


export const BlogQuery = gql`query GetAllBlogsPost {
    getAllBlogsPost {
      title
      content
      blogsID
      image
      createdAt
      expertise
      author {
        profile {
          fullname
        }
      }
    }
  }`

export const BlogSearch = gql`query Query($search: String!) {
  getBlogSearch(search: $search) {
    title
      content
      blogsID
      image
      createdAt
      expertise
      author {
        profile {
          fullname
        }
      }
  }
}`