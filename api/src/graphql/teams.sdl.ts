export const schema = gql`
  type Team {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    players: [Player]!
    club: Club
    clubId: String
    owner: User
    ownerId: String
    invitationToken: String
    season: [Season]!
  }

  type Query {
    teams: [Team!]! @requireAuth
    team(id: String!): Team @requireAuth
    teamByInvitationToken(invitationToken: String!): Team @requireAuth
  }

  input CreateTeamInput {
    name: String!
    clubId: String!
    ownerId: String!
    ownerIsPlayer: Boolean!
  }

  input UpdateTeamInput {
    name: String!
    clubId: String!
    ownerId: String!
    ownerIsPlayer: Boolean!
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team! @requireAuth
    updateTeam(id: String!, input: UpdateTeamInput!): Team! @requireAuth
    deleteTeam(id: String!): Team! @requireAuth

    createInvitationToken(id: String!): Team! @requireAuth
    deleteInvitationToken(id: String!): Team! @requireAuth
  }
`
