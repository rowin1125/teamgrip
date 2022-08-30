export const SEASON_FRAGMENT = gql`
  fragment SeasonFragment on Season {
    id
    createdAt
    updatedAt
    name
    trainings {
      id
    }
    score {
      id
    }
  }
`
