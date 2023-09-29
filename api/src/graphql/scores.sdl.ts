export const schema = gql`
    type Score {
        id: String!
        points: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
        type: ScoreType!
        season: Season!
        seasonId: String!
        player: Player!
        playerId: String!
        training: Training
        trainingId: String
        game: Game
        gameId: String
        _count: Int
    }

    enum ScoreType {
        TRAINING
        TOP_TRAINING
        GAME
        TOP_GAME
    }

    type Query {
        scores: [Score!]! @requireAuth
        score(id: String!): Score @requireAuth
    }

    input CreateScoreInput {
        points: Int!
        type: ScoreType!
        seasonId: String!
        playerId: String!
        trainingId: String
        teamId: String!
        gameId: String
    }

    input UpdateScoreInput {
        points: Int!
        type: ScoreType!
        seasonId: String!
        playerId: String!
        trainingId: String
        gameId: String!
        teamId: String
    }

    type Mutation {
        createScore(input: CreateScoreInput!): Score! @requireAuth @isTeamOwner
        updateScore(id: String!, input: UpdateScoreInput!): Score!
            @requireAuth
            @isTeamOwner
        deleteScore(id: String!): Score! @requireAuth @isTeamOwner
    }
`;
