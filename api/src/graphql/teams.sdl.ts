export const schema = gql`
    type Team {
        id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
        clubTeamName: String!
        players: [Player]!
        club: Club
        clubId: String
        owner: User
        ownerId: String
        invitationToken: String
        season: [Season]!
        trainings: [Training]!
        games: [Game]!
        historyPlayers: [Player]!
        scoreModuleActive: Boolean!
        activityPresence: [ActivityPresence]
    }

    type AllGamesAndTrainings {
        players: [Player]!
        games: [Game]!
        trainings: [Training]!
    }

    type Query {
        teams: [Team!]! @requireAuth
        team(id: String!): Team @requireAuth
        teamByInvitationToken(invitationToken: String!): Team @requireAuth
        teamExtraDetails(id: String!): Team @requireAuth
        getAllGamesAndTrainingsByTeamId(teamId: String!): AllGamesAndTrainings
            @requireAuth
    }

    input CreateTeamInput {
        name: String!
        clubTeamName: String!
        clubId: String!
        ownerId: String!
        ownerIsPlayer: Boolean!
        scoreModuleActive: Boolean!
    }

    input UpdateTeamInput {
        name: String!
        clubTeamName: String!
        clubId: String!
        ownerId: String!
        ownerIsPlayer: Boolean!
        scoreModuleActive: Boolean!
    }

    type Mutation {
        createTeam(input: CreateTeamInput!): Team! @requireAuth
        updateTeam(id: String!, input: UpdateTeamInput!): Team!
            @requireAuth
            @isTeamOwner
        deleteTeam(id: String!): Team! @requireAuth

        createInvitationToken(id: String!): Team! @requireAuth @isTeamOwner
        deleteInvitationToken(id: String!): Team! @requireAuth @isTeamOwner
    }
`;
