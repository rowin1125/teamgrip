export const schema = gql`
  type Team {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    players: [Player]!
    club: Club
    clubId: String
  }

  type Query {
    teams: [Team!]! @requireAuth
    team(id: String!): Team @requireAuth
  }

  input CreateTeamInput {
    name: String!
    clubId: String
  }

  input UpdateTeamInput {
    name: String
    clubId: String
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team! @requireAuth
    updateTeam(id: String!, input: UpdateTeamInput!): Team! @requireAuth
    deleteTeam(id: String!): Team! @requireAuth
  }
`
