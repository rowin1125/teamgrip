import { AVATAR_FRAGMENT } from './AvatarFragment'

export const GAME_FRAGMENT = gql`
  ${AVATAR_FRAGMENT}
  fragment GameFragment on Game {
    id
    createdAt
    updatedAt
    gameDate
    season {
      name
      id
    }
    players {
      id
      displayName
    }
    scores {
      id
      points
      type
      player {
        displayName
        id
        user {
          ...AvatarFragment
        }
      }
    }
    teamId
    team {
      id
      name
      season {
        id
      }
    }
  }
`
