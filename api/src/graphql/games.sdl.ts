export const schema = gql`
  type Game {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    gameDate: DateTime!
    season: Season
    seasonId: String
    players: [Player]!
    scores: [Score]!
    team: Team!
    teamId: String!
  }

  type Query {
    games: [Game!]! @requireAuth
    game(id: String!): Game @requireAuth
    gamesByTeamId(id: String!): [Game]! @requireAuth
  }

  input CreateGameInput {
    gameDate: DateTime!
    seasonId: String
    teamId: String!
  }

  input UpdateGameInput {
    gameDate: DateTime
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
`
