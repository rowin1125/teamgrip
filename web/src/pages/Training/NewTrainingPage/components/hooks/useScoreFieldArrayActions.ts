import { useState } from 'react'

import { useFormikContext } from 'formik'
import {
  FindTeamQuery,
  GetPlayersForTeamQuery,
  GetTrainingByIdQuery,
} from 'types/graphql'

import { toast } from '@redwoodjs/web/dist/toast'

import { scoreBlueprint } from '../../hooks/useCreateTraining'
import { ScoreFormValues } from '../CreateScoreFieldArrayInputs'

import { useGetInitialBenchPlayers } from './useGetInitialBenchPlayers'

type UseScoreFieldArrayActionsType = {
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetTrainingByIdQuery['training']['players']
  push: (obj: any) => void
  remove: <T>(index: number) => T
  team?: FindTeamQuery['team'] | GetTrainingByIdQuery['training']['team']
}

export const useScoreFieldArrayActions = ({
  players,
  team,
  push,
  remove,
}: UseScoreFieldArrayActionsType) => {
  const { values, setFieldValue } = useFormikContext<ScoreFormValues>()
  const { initialBenchPlayers } = useGetInitialBenchPlayers(players)

  const [benchPlayers, setBenchPlayers] = useState(initialBenchPlayers)

  const defaultTeamSeasonId = team?.season.filter((season) =>
    season.name.includes(new Date().getFullYear().toString())
  )?.[0]?.id

  const handleRemove = (currentPlayer, index: number) => {
    setBenchPlayers((prevBenchPlayers) => [...prevBenchPlayers, currentPlayer])

    const topPlayer = values.topTrainingScores.find(
      (score) => currentPlayer.id === score.playerId
    )
    if (topPlayer.playerId) {
      const filteredTopTraining = values.topTrainingScores.filter(
        (score) => score.playerId !== currentPlayer.id
      )
      const newTopTrainingScores = [
        ...filteredTopTraining,
        { ...scoreBlueprint, playerId: '', type: 'TOP_TRAINING' },
      ]
      setFieldValue('topTrainingScores', newTopTrainingScores)
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
    setBenchPlayers([...filteredPlayers])
    toast.success('Speler neemt deel aan de training', {
      duration: 2000,
    })

    push({
      ...scoreBlueprint,
      playerId,
      teamId: team.id,
      seasonId: values.seasonId || defaultTeamSeasonId || '',
    })
  }

  const playersScoreArray = values?.scores?.sort((a, b) => {
    const playerA = players.find(
      (player) => player.id === a.playerId
    ) as GetPlayersForTeamQuery['playersForTeam'][0]
    const playerB = players.find(
      (player) => player.id === b.playerId
    ) as GetPlayersForTeamQuery['playersForTeam'][0]

    return playerA?.displayName.localeCompare(playerB?.displayName)
  })

  return {
    handleRemove,
    handlePush,
    playersScoreArray,
    benchPlayers,
  }
}
