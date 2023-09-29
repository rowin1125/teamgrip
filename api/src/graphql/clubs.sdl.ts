export const schema = gql`
    type Club {
        id: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
        teams: [Team]!
        players: [Player]
        season: [Season]!
        trainings: [Training]!
        games: [Game]!
    }

    type Query {
        clubs: [Club!]! @requireAuth
        club(id: String!): Club @requireAuth
        clubSearch(term: String!): [Club!]! @requireAuth
    }

    input CreateClubInput {
        name: String!
    }

    input UpdateClubInput {
        name: String!
    }

    type Mutation {
        createClub(input: CreateClubInput!): Club! @requireAuth
        updateClub(id: String!, input: UpdateClubInput!): Club!
            @requireAuth(roles: ["ADMIN"])
        deleteClub(id: String!): Club! @requireAuth(roles: ["ADMIN"])
    }
`;
