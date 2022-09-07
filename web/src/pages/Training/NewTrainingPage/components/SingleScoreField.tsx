import { Box, Heading } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import {
  FindTeamQuery,
  GetPlayersForTeamQuery,
  GetTrainingByIdQuery,
} from 'types/graphql'

import { ScoreFormValues } from './CreateScoreFieldArrayInputs'
import { useScoreFieldArrayActions } from './hooks/useScoreFieldArrayActions'
import ScoreFieldArrayBenchPlayers from './ScoreFieldArrayBenchPlayers'
import ScoreFieldArrayRow from './ScoreFieldArrayRow'
import SingleTopTrainingScores from './SingleTopTrainingScores'

type SingleScoreFieldProps = {
  push: (obj: any) => void
  remove: <T>(index: number) => T
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetTrainingByIdQuery['training']['players']
  team?: FindTeamQuery['team'] | GetTrainingByIdQuery['training']['team']
}

const SingleScoreField = ({
  push,
  remove,
  players,
  team,
}: SingleScoreFieldProps) => {
  const { values } = useFormikContext<ScoreFormValues>()

  const { handlePush, playersScoreArray, benchPlayers, handleRemove } =
    useScoreFieldArrayActions({
      players,
      push,
      remove,
      team,
    })

  return (
    <Box>
      <Heading mb={4}>Scores</Heading>

      <Heading fontSize="xl" mb={4}>
        Top 3 training
      </Heading>
      <Box w={{ base: 'full', '2xl': '50%' }} mb={8}>
        {values.topTrainingScores.map((_, index) => {
          return (
            <SingleTopTrainingScores
              key={`topTrainingScores.${index}.playerId`}
              playersScoreArray={playersScoreArray}
              players={players}
              index={index}
            />
          )
        })}
      </Box>
      <Heading fontSize="xl" mb={4}>
        Spelers toevoegen voor de training
      </Heading>
      <ScoreFieldArrayBenchPlayers
        benchPlayers={benchPlayers}
        handlePush={handlePush}
      />

      <Heading fontSize="xl" mb={4}>
        Trainingspunten
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
}

export default SingleScoreField
