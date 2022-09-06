import { useState } from 'react'

import { Box, Heading } from '@chakra-ui/react'
import { FieldArray, useFormikContext } from 'formik'
import {
  CreateScoreInput,
  CreateTrainingInput,
  GetPlayersForTeamQuery,
} from 'types/graphql'

import { scoreBlueprint } from '../hooks/useCreateTraining'

import ScoreFieldArrayBenchPlayers from './ScoreFieldArrayBenchPlayers'
import ScoreFieldArrayRow from './ScoreFieldArrayRow'

type CreateScoreFieldArrayInputsProps = {
  players: GetPlayersForTeamQuery['playersForTeam']
}

type FormikValues = {
  input: CreateTrainingInput
  scores: CreateScoreInput[]
}

const CreateScoreFieldArrayInputs = ({
  players,
}: CreateScoreFieldArrayInputsProps) => {
  const { values } = useFormikContext<FormikValues>()
  const [benchPlayers, setBenchPlayers] = useState<
    GetPlayersForTeamQuery['playersForTeam']
  >([])

  return (
    <FieldArray
      name="scores"
      render={({ push, remove }) => {
        const handleRemove = (
          currentPlayer: GetPlayersForTeamQuery['playersForTeam'][0],
          index: number
        ) => {
          setBenchPlayers((prevBenchPlayers) => [
            ...prevBenchPlayers,
            currentPlayer,
          ])
          remove(index)
        }

        const handlePush = (playerId: string) => {
          const filteredPlayers = benchPlayers.filter(
            (benchPlayer) => benchPlayer.id !== playerId
          )
          setBenchPlayers([...filteredPlayers])
          push({ ...scoreBlueprint, playerId })
        }

        const playersScoreArray = values?.scores?.sort((a, b) => {
          const playerA = players.find(
            (player) => player.id === a.playerId
          ) as GetPlayersForTeamQuery['playersForTeam'][0]
          const playerB = players.find(
            (player) => player.id === b.playerId
          ) as GetPlayersForTeamQuery['playersForTeam'][0]

          return playerA.displayName.localeCompare(playerB.displayName)
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
