import type { FindTeamsQuery, FindTeamsQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ClubTeam from '../ClubTeam/ClubTeam'

export const QUERY = gql`
  query FindClubTeamQuery($id: String!) {
    team(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTeamsQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  team,
}: CellSuccessProps<FindTeamsQuery, FindTeamsQueryVariables>) => {
  return <ClubTeam team={team} />
}
