import { useState } from 'react'

import { Box, Heading } from '@chakra-ui/react'
import { FieldArray, useFormikContext } from 'formik'
import {
  CreateScoreInput,
  CreateTrainingInput,
  FindTeamQuery,
  GetPlayersForTeamQuery,
  GetTrainingByIdQuery,
} from 'types/graphql'

import { toast } from '@redwoodjs/web/dist/toast'

import { scoreBlueprint } from '../hooks/useCreateTraining'

import ScoreFieldArrayBenchPlayers from './ScoreFieldArrayBenchPlayers'
import ScoreFieldArrayRow from './ScoreFieldArrayRow'

type FormikValues = CreateTrainingInput & {
  scores: CreateScoreInput[]
}

type CreateScoreFieldArrayInputsProps = {
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetTrainingByIdQuery['training']['players']
  team?: FindTeamQuery['team'] | GetTrainingByIdQuery['training']['team']
}

const CreateScoreFieldArrayInputs = ({
  players,
  team,
}: CreateScoreFieldArrayInputsProps) => {
  const { values } = useFormikContext<FormikValues>()

  const initialBenchPlayers = players
    .filter((player) => {
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
  const [benchPlayers, setBenchPlayers] = useState(initialBenchPlayers)

  return (
    <FieldArray
      name="scores"
      render={({ push, remove }) => {
        const defaultTeamSeasonId = team?.season.filter((season) =>
          season.name.includes(new Date().getFullYear().toString())
        )?.[0].id

        const handleRemove = (currentPlayer, index: number) => {
          setBenchPlayers((prevBenchPlayers) => [
            ...prevBenchPlayers,
            currentPlayer,
          ])
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

        return (
          <Box>
            <Heading mb={4}>Scores</Heading>
            <Heading fontSize="xl" mb={4}>
              Spelers toevoegen
            </Heading>
            <ScoreFieldArrayBenchPlayers
              benchPlayers={benchPlayers}
              handlePush={handlePush}
            />
            <Heading fontSize="xl" mb={4}>
              Speler & Punten
            </Heading>
            {playersScoreArray?.map((score, index) => (
              <ScoreFieldArrayRow
                score={score}
                index={index}
                handleRemove={handleRemove}
                players={players}
                key={score.playerId}
              />
            ))}
          </Box>
        )
      }}
    />
  )
}

export default CreateScoreFieldArrayInputs
