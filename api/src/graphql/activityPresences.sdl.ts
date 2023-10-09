export const schema = gql`
    type ActivityPresence {
        id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        activityType: ActivityType!
        player: Player!
        playerId: String!
        present: Boolean!
        season: Season!
        seasonId: String!
        team: Team!
        teamId: String!
        game: Game
        gameId: String
        training: Training
        trainingId: String
    }

    enum ActivityType {
        TRAINING
        GAME
    }

    type Query {
        activityPresences: [ActivityPresence!]! @requireAuth
        activityPresence(id: String!): ActivityPresence @requireAuth
        activityPresenceByPlayerAndSeason(
            playerId: String!
            seasonId: String!
        ): ActivityPresence @requireAuth
        teamActivityPresences(
            teamId: String!
            seasonId: String!
            activityType: ActivityType!
        ): [ActivityPresence!] @requireAuth
    }

    input CreateActivityPresenceInput {
        activityType: ActivityType!
        playerId: String!
        present: Boolean!
        seasonId: String!
        teamId: String!
    }

    input UpdateActivityPresenceInput {
        activityType: ActivityType!
        playerId: String!
        present: Boolean!
        seasonId: String!
        teamId: String!
    }

    type Mutation {
        createActivityPresence(
            input: CreateActivityPresenceInput!
        ): ActivityPresence! @requireAuth
        updateActivityPresence(
            id: String!
            input: UpdateActivityPresenceInput!
        ): ActivityPresence! @requireAuth
        deleteActivityPresence(id: String!): ActivityPresence! @requireAuth
    }
`;
