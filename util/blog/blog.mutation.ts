import { gql } from "@apollo/client";


export const CreatBlogPost = gql`mutation Mutation($userId: ID!, $blog: blogInput) {
    createBlogPost(userID: $userId, blog: $blog) {
      blogsID
      content
    }
  }`


export const DeleteBlogPost = gql`mutation Mutation($blogsId: ID!) {
  deleteBlogPost(blogsID: $blogsId) {
    blogsID
  }
}`


export const UpdateBlogPost = gql`mutation Mutation($blogsId: ID!, $blog: blogInput) {
  updateBlogsPost(blogsID: $blogsId, blog: $blog) {
    blogsID
  }
}`


