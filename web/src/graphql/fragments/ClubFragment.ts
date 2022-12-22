export const CLUB_FRAGMENT = gql`
  fragment ClubFragment on Club {
    id
    createdAt
    updatedAt
    name
    teams {
      id
      name
      owner {
        userProfile {
          firstname
          lastname
        }
      }
      players {
        id
      }
      season {
        id
        name
      }
      trainings {
        id
      }
      games {
        id
      }
    }
  }
`;
