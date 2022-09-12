import { Box, Heading } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import {
  FindTeamQuery,
  GetPlayersForTeamQuery,
  GetGameByIdQuery,
} from 'types/graphql'

import { ScoreFormValues } from './CreateScoreFieldArrayInputs'
import { useScoreFieldArrayActions } from './hooks/useScoreFieldArrayActions'
import ScoreFieldArrayBenchPlayers from './ScoreFieldArrayBenchPlayers'
import ScoreFieldArrayRow from './ScoreFieldArrayRow'
import SingleTopGameScores from './SingleTopGameScores'

type SingleScoreFieldProps = {
  push: (obj: any) => void
  remove: <T>(index: number) => T
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetGameByIdQuery['game']['players']
  team?: FindTeamQuery['team'] | GetGameByIdQuery['game']['team']
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
        Top 3 van de wedstrijd
      </Heading>
      <Box w={{ base: 'full', '2xl': '50%' }} mb={8}>
        {values.topGameScores?.map((_, index) => {
          return (
            <SingleTopGameScores
              key={`topGameScores.${index}.playerId`}
              playersScoreArray={playersScoreArray}
              players={players}
              index={index}
            />
          )
        })}
      </Box>
      <Heading fontSize="xl" mb={4}>
        Spelers toevoegen voor de wedstrijd
      </Heading>
      <ScoreFieldArrayBenchPlayers
        benchPlayers={benchPlayers}
        handlePush={handlePush}
      />

      <Heading fontSize="xl" mb={4}>
        Wedstrijdpunten
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
