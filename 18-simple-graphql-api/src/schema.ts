import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    hello: String
    greet(name: String!): String!
    users: [User]!
  }

  type Mutation {
    addUser(name: String!, age: Int!): User!
  }
`;
