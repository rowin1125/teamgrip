export const schema = gql`
  type Score {
    id: String!
    score: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    type: ScoreType!
    season: Season!
    seasonId: String!
    player: Player!
    playerId: String!
    training: Training!
    trainingId: String!
  }

  enum ScoreType {
    TRAINING
  }

  type Query {
    scores: [Score!]! @requireAuth
    score(id: String!): Score @requireAuth
  }

  input CreateScoreInput {
    score: Int!
    type: ScoreType!
    seasonId: String!
    playerId: String!
    trainingId: String!
  }

  input UpdateScoreInput {
    score: Int
    type: ScoreType
    seasonId: String
    playerId: String
    trainingId: String
  }

  type Mutation {
    createScore(input: CreateScoreInput!): Score! @requireAuth
    updateScore(id: String!, input: UpdateScoreInput!): Score! @requireAuth
    deleteScore(id: String!): Score! @requireAuth
  }
`
