export const schema = gql`
    type UserProfile {
        id: String!
        userId: String!
        firstname: String
        lastname: String
        user: User!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        userProfiles: [UserProfile!]! @requireAuth
        userProfile(id: String!): UserProfile @requireAuth
    }

    input CreateUserProfileInput {
        userId: String!
        firstname: String
        lastname: String
    }

    input UpdateUserProfileInput {
        userId: String
        firstname: String
        lastname: String
    }

    type Mutation {
        createUserProfile(input: CreateUserProfileInput!): UserProfile!
            @requireAuth
        updateUserProfile(
            id: String!
            input: UpdateUserProfileInput!
        ): UserProfile! @requireAuth
        deleteUserProfile(id: String!): UserProfile! @requireAuth
    }
`;
