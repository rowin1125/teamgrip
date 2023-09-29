export const AVATAR_FRAGMENT = gql`
    fragment AvatarFragment on User {
        avatar {
            avatarStyle
            topType
            accessoriesType
            hatColor
            hairColor
            facialHairType
            facialHairColor
            clotheType
            clotheColor
            graphicType
            eyeType
            eyebrowType
            mouthType
            skinColor
        }
    }
`;
