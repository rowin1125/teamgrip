/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { useFormikContext } from 'formik'
import {
  FindTeamQuery,
  GetGameByIdQuery,
  GetPlayersForTeamQuery,
} from 'types/graphql'

import { toast } from '@redwoodjs/web/dist/toast'

import { scoreBlueprint } from '../../hooks/useCreateGame'
import { ScoreFormValues } from '../CreateScoreFieldArrayInputs'

import { useGetInitialBenchPlayers } from './useGetInitialBenchPlayers'

type UseScoreFieldArrayActionsType = {
  players:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetGameByIdQuery['game']['players']
  push: (obj: any) => void
  remove: <T>(index: number) => T | undefined
  team?: FindTeamQuery['team']
}

export const useScoreFieldArrayActions = ({
  players,
  team,
  push,
  remove,
}: UseScoreFieldArrayActionsType) => {
  const { values, setFieldValue } = useFormikContext<ScoreFormValues>()
  const { initialBenchPlayers } = useGetInitialBenchPlayers(players, team)

  const [benchPlayers, setBenchPlayers] = useState(initialBenchPlayers)

  const seasonMatchesThisYear = team?.season?.filter((season) =>
    season?.name?.includes(new Date().getFullYear().toString())
  )?.[0]?.id

  const defaultSeasonId = seasonMatchesThisYear ?? team?.season[0]?.id

  const handleRemove = (
    currentPlayer: Record<string, unknown>,
    index: number
  ) => {
    setBenchPlayers((prevBenchPlayers: any) => [
      ...prevBenchPlayers,
      currentPlayer,
    ])

    const topPlayer = values.topGameScores.find(
      (score) => currentPlayer.id === score.playerId
    )

    if (topPlayer?.playerId) {
      const filteredTopGame = values.topGameScores.filter(
        (score) => score.playerId !== currentPlayer.id
      )
      const playerPresentInTopGame = values.topGameScores.filter(
        (score) => score.playerId === currentPlayer.id
      )
      const playerPresentAmount = playerPresentInTopGame?.length ?? 0
      const newTopGameScores = [
        ...filteredTopGame,
        ...Array(playerPresentAmount)
          .fill(scoreBlueprint)
          .map(() => ({
            ...scoreBlueprint,
            playerId: '',
            type: 'TOP_GAME',
            seasonId: values.seasonId || defaultSeasonId || '',
            teamId: values.teamId || team?.id || '',
          })),
      ]
      setFieldValue('topGameScores', newTopGameScores)
    }

    toast.success('Speler naar op afwezig', {
      duration: 2000,
    })
    remove(index)
  }

  const handlePush = (playerId: string) => {
    const filteredPlayers = benchPlayers.filter(
      (benchPlayer) => benchPlayer.id !== playerId
    )
    if (!filteredPlayers) return

    setBenchPlayers([...filteredPlayers])
    toast.success('Speler neemt deel aan de wedstrijd', {
      duration: 2000,
    })

    push({
      ...scoreBlueprint,
      playerId,
      teamId: team?.id,
      seasonId: values.seasonId || defaultSeasonId || '',
    })
  }

  const playersScoreArray = values?.scores?.sort((a, b) => {
    if (!a?.playerId || !b?.playerId) return 0

    const playerA = players.find(
      (player) => player?.id === a.playerId
    ) as GetPlayersForTeamQuery['playersForTeam'][0]
    const playerB = players.find(
      (player) => player?.id === b.playerId
    ) as GetPlayersForTeamQuery['playersForTeam'][0]

    if (!playerA?.displayName || !playerB?.displayName) return 0

    return playerA?.displayName.localeCompare(playerB?.displayName)
  })

  return {
    handleRemove,
    handlePush,
    playersScoreArray,
    benchPlayers,
  }
}
