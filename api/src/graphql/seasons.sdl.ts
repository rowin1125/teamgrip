export const schema = gql`
  type Season {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    seasonTeamName: String!
    score: [Score]!
    team: Team!
    teamId: String!
    trainings: [Training]!
    games: [Game]!
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
      @isTeamOwner
    updateSeason(id: String!, input: UpdateSeasonInput!): Season!
      @requireAuth
      @isTeamOwner
    deleteSeason(id: String!): Season! @requireAuth @isTeamOwner
  }
`
