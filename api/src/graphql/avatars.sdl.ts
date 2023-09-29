export const schema = gql`
    type Avatar {
        id: String!
        userId: String!
        avatarStyle: String!
        topType: String!
        accessoriesType: String!
        hatColor: String!
        hairColor: String!
        facialHairType: String!
        facialHairColor: String!
        clotheType: String!
        clotheColor: String!
        graphicType: String!
        eyeType: String!
        eyebrowType: String!
        mouthType: String!
        skinColor: String!
        user: User!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        avatars: [Avatar!]! @requireAuth
        avatar(id: String!): Avatar @requireAuth
    }

    input CreateAvatarInput {
        userId: String!
        avatarStyle: String!
        topType: String!
        accessoriesType: String!
        hatColor: String!
        hairColor: String!
        facialHairType: String!
        facialHairColor: String!
        clotheType: String!
        clotheColor: String!
        graphicType: String!
        eyeType: String!
        eyebrowType: String!
        mouthType: String!
        skinColor: String!
    }

    input UpdateAvatarInput {
        userId: String
        avatarStyle: String
        topType: String
        accessoriesType: String
        hatColor: String
        hairColor: String
        facialHairType: String
        facialHairColor: String
        clotheType: String
        clotheColor: String
        graphicType: String
        eyeType: String
        eyebrowType: String
        mouthType: String
        skinColor: String
    }

    type Mutation {
        createAvatar(input: CreateAvatarInput!): Avatar! @requireAuth
        updateAvatar(id: String!, input: UpdateAvatarInput!): Avatar!
            @requireAuth
        deleteAvatar(id: String!): Avatar! @requireAuth
    }
`;
