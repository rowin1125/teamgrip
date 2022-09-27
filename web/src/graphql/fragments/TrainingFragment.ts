import { AVATAR_FRAGMENT } from './AvatarFragment'

export const TRAINING_FRAGMENT = gql`
  ${AVATAR_FRAGMENT}
  fragment TrainingFragment on Training {
    id
    createdAt
    updatedAt
    date
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
