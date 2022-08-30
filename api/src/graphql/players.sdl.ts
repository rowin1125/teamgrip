export const schema = gql`
  type Player {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String
    user: User
    teamId: String
    team: Team
    club: Club
    clubId: String
    teamInvitation: String
    ghostInvitation: String
    displayName: String
    isGhost: Boolean!
  }

  type Query {
    players: [Player!]! @requireAuth
    player(id: String!): Player @requireAuth
    playersForTeam(teamId: String!): [Player]! @requireAuth
    getGhostPlayersByTeamId(teamId: String!): [Player]! @requireAuth
    getGhostPlayerByInvitation(ghostInvitation: String!): Player @requireAuth
  }

  input CreatePlayerInput {
    userId: String
    teamId: String
    clubId: String
    isActivePlayer: Boolean
    teamInvitation: String
    ghostInvitation: String
    displayName: String
    isGhost: Boolean
  }

  input UpdatePlayerInput {
    userId: String
    teamId: String
    clubId: String
    isActivePlayer: Boolean
    teamInvitation: String
    ghostInvitation: String
    displayName: String
    isGhost: Boolean
  }

  input CreateGhostPlayersInput {
    players: [CreatePlayerInput]!
    teamId: String!
  }

  type CreateManyGhostPlayersReturnType {
    count: Int!
  }

  type Mutation {
    createManyGhostPlayers(
      input: CreateGhostPlayersInput!
    ): CreateManyGhostPlayersReturnType! @requireAuth
    createGhostPlayerInvitation(id: String!): Player! @requireAuth
    deleteGhostPlayerInvitation(id: String!): Player! @requireAuth
    playerJoinsTeamByGhostInvitation(
      id: String!
      ghostId: String!
      teamId: String!
    ): Player! @requireAuth

    createPlayer(input: CreatePlayerInput!): Player! @requireAuth
    updatePlayer(id: String!, input: UpdatePlayerInput!): Player! @requireAuth
    deletePlayer(id: String!): Player! @requireAuth
  }
`
