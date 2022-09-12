export const GAME_FRAGMENT = gql`
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
