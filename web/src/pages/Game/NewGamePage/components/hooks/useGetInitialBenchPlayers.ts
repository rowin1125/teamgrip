import { useFormikContext } from 'formik'
import {
  FindTeamQuery,
  GetGameByIdQuery,
  GetPlayersForTeamQuery,
} from 'types/graphql'

import { ScoreFormValues } from '../CreateScoreFieldArrayInputs'

export const useGetInitialBenchPlayers = (
  players:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetGameByIdQuery['game']['players'],
  team: FindTeamQuery['team']
) => {
  const { values } = useFormikContext<ScoreFormValues>()

  const playersWithoutScores = players
    ?.filter((player) => {
      const playerScore = values.scores.find(
        (score) => score.playerId === player?.id
      )
      // eslint-disable-next-line no-prototype-builtins
      return !playerScore?.hasOwnProperty('playerId')
    })
    .map((player) => ({
      __typename: player?.__typename,
      displayName: player?.displayName,
      id: player?.id,
    }))

  const teamPlayerAreNotInPlayersArray = team?.players.filter((teamPlayer) => {
    if (!teamPlayer?.isActivePlayer) return false

    const playerIsNotInPlayersArray = players.find(
      (player) => player?.id === teamPlayer?.id
    )

    return !playerIsNotInPlayersArray?.id
  })

  const missingPlayers =
    teamPlayerAreNotInPlayersArray?.map((missingPlayer) => ({
      __typename: missingPlayer?.__typename,
      displayName: missingPlayer?.displayName,
      id: missingPlayer?.id,
    })) || []

  const initialBenchPlayers = [...playersWithoutScores, ...missingPlayers]

  return { initialBenchPlayers }
}
