export const PLAYER_FRAGMENT = gql`
  fragment PlayerFragment on Player {
    id
    createdAt
    updatedAt
    userId
    teamId
    clubId
    teamInvitation
  }
`
