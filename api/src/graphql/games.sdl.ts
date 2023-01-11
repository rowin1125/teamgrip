export const schema = gql`
  type Game {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    date: DateTime!
    season: Season
    seasonId: String
    players: [Player]!
    scores: [Score]!
    team: Team!
    teamId: String!
  }

  type PaginatedGames {
    games: [Game]!
    total: Int!
  }

  type Query {
    games: [Game!]! @requireAuth
    game(id: String!): Game! @requireAuth
    gamesByTeamId(id: String!, limit: Int!, page: Int!): PaginatedGames
      @requireAuth
    getRecentGames(playerId: String!, limit: Int!): [Game!]! @requireAuth
  }

  input CreateGameInput {
    date: DateTime!
    seasonId: String
    teamId: String!
  }

  input UpdateGameInput {
    date: DateTime
    seasonId: String
    teamId: String
  }

  type Mutation {
    createGame(input: CreateGameInput!, scores: [CreateScoreInput]!): Game!
      @requireAuth
      @isTeamOwner
    updateGame(
      id: String!
      input: UpdateGameInput!
      scores: [CreateScoreInput]!
    ): Game! @requireAuth @isTeamOwner
    deleteGame(id: String!): Game! @requireAuth @isTeamOwner
  }
`;
