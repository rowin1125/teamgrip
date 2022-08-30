export const schema = gql`
  type Season {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    seasonTeamName: String!
    trainings: [Training]!
    score: [Score]!
    team: Team!
    teamId: String!
  }

  type Query {
    seasons: [Season!]! @requireAuth
    season(id: String!): Season @requireAuth
  }

  input CreateSeasonInput {
    name: String!
    seasonTeamName: String!
  }

  input UpdateSeasonInput {
    name: String
    seasonTeamName: String!
  }

  type Mutation {
    createSeason(input: CreateSeasonInput!, teamId: String!): Season!
      @requireAuth
    updateSeason(id: String!, input: UpdateSeasonInput!): Season! @requireAuth
    deleteSeason(id: String!): Season! @requireAuth
  }
`
