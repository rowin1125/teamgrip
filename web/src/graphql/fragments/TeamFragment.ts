export const TEAM_FRAGMENT = gql`
  fragment TeamFragment on Team {
    id
    name
    invitationToken
    owner {
      id
      userProfile {
        firstname
        lastname
      }
    }
    club {
      name
    }
  }
`
