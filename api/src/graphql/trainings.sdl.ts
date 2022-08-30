export const schema = gql`
  type Training {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    trainingsDate: DateTime!
    season: Season
    seasonId: String
    players: [Player]!
    score: [Score]!
  }

  type Query {
    trainings: [Training!]! @requireAuth
    training(id: String!): Training @requireAuth
  }

  input CreateTrainingInput {
    trainingsDate: DateTime!
    seasonId: String
  }

  input UpdateTrainingInput {
    trainingsDate: DateTime
    seasonId: String
  }

  type Mutation {
    createTraining(input: CreateTrainingInput!): Training! @requireAuth
    updateTraining(id: String!, input: UpdateTrainingInput!): Training!
      @requireAuth
    deleteTraining(id: String!): Training! @requireAuth
  }
`
