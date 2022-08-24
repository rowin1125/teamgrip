export const schema = gql`
  type Player {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    user: User!
    teamId: String
    team: Team
    club: Club
    clubId: String
  }

  type Query {
    players: [Player!]! @requireAuth
    player(id: String!): Player @requireAuth
    playersForTeam(teamId: String!): [Player]! @skipAuth
  }

  input CreatePlayerInput {
    userId: String!
    teamId: String
    clubId: String
    isCoach: Boolean
    isActivePlayer: Boolean
  }

  input UpdatePlayerInput {
    userId: String
    teamId: String
    clubId: String
    isCoach: Boolean
    isActivePlayer: Boolean
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player! @requireAuth
    updatePlayer(id: String!, input: UpdatePlayerInput!): Player! @requireAuth
    deletePlayer(id: String!): Player! @requireAuth
  }
`
