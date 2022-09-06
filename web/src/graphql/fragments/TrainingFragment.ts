export const TRAINING_FRAGMENT = gql`
  fragment TrainingFragment on Training {
    id
    createdAt
    updatedAt
    trainingsDate
    season {
      name
    }
    players {
      id
    }
    scores {
      points
      player {
        displayName
      }
    }
    teamId
  }
`
