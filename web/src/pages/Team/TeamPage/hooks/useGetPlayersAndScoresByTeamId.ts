import {
  GetPlayersAndScoresByTeamId,
  GetPlayersAndScoresByTeamIdVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

export const GET_PLAYERS_AND_SCORES_BY_TEAM_ID = gql`
  query GetPlayersAndScoresByTeamId($teamId: String!) {
    getPlayersAndScoresByTeamId(teamId: $teamId) {
      id
      totalScore
      displayName
      user {
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

export const useGetPlayersAndScoresByTeamId = () => {
  const { currentUser } = useAuth()

  const { data: playersWithTotalScore, loading } = useQuery<
    GetPlayersAndScoresByTeamId,
    GetPlayersAndScoresByTeamIdVariables
  >(GET_PLAYERS_AND_SCORES_BY_TEAM_ID, {
    variables: { teamId: currentUser?.player?.teamId || '' },
  })

  return {
    playersWithTotalScore: playersWithTotalScore?.getPlayersAndScoresByTeamId,
    playersWithTotalScoreLoading: loading,
  }
}
