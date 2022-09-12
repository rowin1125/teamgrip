import { useFormikContext } from 'formik'
import { GetGameByIdQuery, GetPlayersForTeamQuery } from 'types/graphql'

import { ScoreFormValues } from '../CreateScoreFieldArrayInputs'

export const useGetInitialBenchPlayers = (
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetGameByIdQuery['game']['players']
) => {
  const { values } = useFormikContext<ScoreFormValues>()

  const initialBenchPlayers = players
    ?.filter((player) => {
      const playerScore = values.scores.find(
        (score) => score.playerId === player.id
      )
      // eslint-disable-next-line no-prototype-builtins
      return !playerScore?.hasOwnProperty('playerId')
    })
    .map((player) => ({
      __typename: player.__typename,
      displayName: player.displayName,
      id: player.id,
    }))

  return { initialBenchPlayers }
}
