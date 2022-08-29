import {
  GetPlayersForTeamQuery,
  GetPlayersForTeamQueryVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

export const GET_PLAYERS_FOR_TEAM_QUERY = gql`
  query GetPlayersForTeamQuery($teamId: String!) {
    playersForTeam(teamId: $teamId) {
      id
      displayName
      user {
        id
        avatar {
          avatarStyle
          topType
          accessoriesType
          hatColor
          hairColor
          facialHairType
          facialHairColor
          clotheType
          clotheColor
          graphicType
          eyeType
          eyebrowType
          mouthType
          skinColor
        }
      }
    }
  }
`

export const useGetPlayersForTeam = () => {
  const { currentUser } = useAuth()

  const { data: playersData, loading } = useQuery<
    GetPlayersForTeamQuery,
    GetPlayersForTeamQueryVariables
  >(GET_PLAYERS_FOR_TEAM_QUERY, {
    variables: { teamId: currentUser?.player?.teamId || '' },
  })

  return { playersData, playersLoading: loading }
}
