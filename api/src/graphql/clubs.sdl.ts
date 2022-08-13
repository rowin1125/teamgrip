export const schema = gql`
  type Club {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    teams: [Team]!
    players: [Player]!
  }

  type Query {
    clubs: [Club!]! @requireAuth
    club(id: String!): Club @requireAuth
  }

  input CreateClubInput {
    name: String!
  }

  input UpdateClubInput {
    name: String
  }

  type Mutation {
    createClub(input: CreateClubInput!): Club! @requireAuth(roles: ["ADMIN"])
    updateClub(id: String!, input: UpdateClubInput!): Club! @requireAuth
    deleteClub(id: String!): Club! @requireAuth
  }
`
