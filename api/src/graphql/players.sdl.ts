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
        playerType: PlayerType
        isGhost: Boolean!
        isActivePlayer: Boolean!
        trainings: [Training]!
        scores: [Score]!
        games: [Game]!
        activityPresence(type: ActivityType): [ActivityPresence]!
        activityPresenceCount(type: ActivityType): Int!
    }

    enum PlayerType {
        PLAYER
        STAFF
    }

    extend type Player {
        totalScore: Float
        avgScore: Float
        activeSeason: Season
    }

    type Query {
        players: [Player!]! @requireAuth
        player(id: String!): Player @requireAuth
        playersForTeam(teamId: String!): [Player]! @requireAuth
        getGhostPlayersByTeamId(teamId: String!): [Player]! @requireAuth
        getGhostPlayerByInvitation(ghostInvitation: String!): Player
            @requireAuth
        getPlayersAndScoresByTeamId(teamId: String!, limit: Int): [Player]!
            @requireAuth
        getPlayerScoresByTeamId(teamId: String!, playerId: String): Player
            @requireAuth
        getPlayersPresenceByTeamId(teamId: String!): [Player]! @requireAuth
        getHistoryPlayersByTeamId(teamId: String!): [Player]! @requireAuth
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
        playerType: PlayerType
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
        playerType: PlayerType
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
        ): CreateManyGhostPlayersReturnType! @requireAuth @isTeamOwner
        createGhostPlayerInvitation(id: String!): Player!
            @requireAuth
            @isTeamOwner
        deleteGhostPlayerInvitation(id: String!): Player!
            @requireAuth
            @isTeamOwner
        playerJoinsTeamByGhostInvitation(
            id: String!
            ghostId: String!
            teamId: String!
        ): Player! @requireAuth
        rejoinTeamFromHistory(id: String!, teamId: String!): Player!
            @requireAuth

        createPlayer(input: CreatePlayerInput!): Player! @requireAuth
        updatePlayer(id: String!, input: UpdatePlayerInput!): Player!
            @requireAuth
        deletePlayer(id: String!): Player! @requireAuth
    }
`;
