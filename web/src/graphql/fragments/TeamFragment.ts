export const TEAM_FRAGMENT = gql`
    fragment TeamFragment on Team {
        id
        name
        invitationToken
        clubTeamName
        scoreModuleActive
        owner {
            id
            player {
                id
            }
            userProfile {
                firstname
                lastname
            }
        }
        club {
            name
            id
        }
        season {
            id
            name
            active
        }
        players {
            id
            displayName
            isActivePlayer
            playerType
        }
    }
`;
