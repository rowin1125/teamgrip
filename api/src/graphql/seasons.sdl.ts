export const schema = gql`
  type Season {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    seasonTeamName: String!
    scores: [Score]!
    team: Team!
    teamId: String!
    trainings: [Training]!
    games: [Game]!
    active: Boolean!
  }

  type Query {
    seasons: [Season!]! @requireAuth
    season(id: String!): Season @requireAuth
    seasonsByTeamId(teamId: String!): [Season]! @requireAuth
  }

  input CreateSeasonInput {
    name: String!
    seasonTeamName: String!
    active: Boolean!
  }

  input UpdateSeasonInput {
    name: String
    seasonTeamName: String!
    active: Boolean!
  }

  type Mutation {
    createSeason(input: CreateSeasonInput!, teamId: String!): Season!
      @requireAuth
      @isTeamOwner
    updateSeason(
      id: String!
      teamId: String!
      input: UpdateSeasonInput!
    ): Season! @requireAuth @isTeamOwner
    deleteSeason(id: String!): Season! @requireAuth @isTeamOwner
  }
`
