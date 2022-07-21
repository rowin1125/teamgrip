export const schema = gql`
  type Team {
    id: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    teams: [Team!]! @skipAuth
    team(id: String!): Team @skipAuth
  }

  input CreateTeamInput {
    name: String!
  }

  input UpdateTeamInput {
    name: String
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team! @requireAuth
    updateTeam(id: String!, input: UpdateTeamInput!): Team! @requireAuth
    deleteTeam(id: String!): Team! @requireAuth
  }
`
