import { Box } from '@chakra-ui/react'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type { ClubTeamsQuery } from 'types/graphql'
import ClubTeam from '../ClubTeam/ClubTeam'

export const QUERY = gql`
  query ClubTeamsQuery {
    teams {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ teams }: CellSuccessProps<ClubTeamsQuery>) => {
  return (
    <Box as="ul" display="flex" flexDir="column">
      {teams.map((item) => (
        <ClubTeam team={item} key={item.id} />
      ))}
    </Box>
  )
}
