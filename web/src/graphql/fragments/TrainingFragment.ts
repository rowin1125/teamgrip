export const TRAINING_FRAGMENT = gql`
  fragment TrainingFragment on Training {
    id
    createdAt
    updatedAt
    trainingsDate
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
      player {
        displayName
        id
      }
    }
    teamId
    team {
      id
      season {
        id
      }
    }
  }
`
