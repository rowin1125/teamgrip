import { useState } from 'react'

import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
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
  team?: FindTeamQuery['team']
}

const SingleScoreField = ({
  push,
  remove,
  players,
  team,
}: SingleScoreFieldProps) => {
  const { values } = useFormikContext<ScoreFormValues>()
  const [calculateNumber, setCalculateNumber] = useState('25')

  const { handlePush, playersScoreArray, benchPlayers, handleRemove } =
    useScoreFieldArrayActions({
      players,
      push,
      remove,
      team,
    })

  const handleCalculateNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setCalculateNumber(value)
  }

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

      <FormControl mb={8}>
        <FormLabel fontWeight="bold" fontSize="xl">
          Rekennummer
        </FormLabel>
        <Input value={calculateNumber} onChange={handleCalculateNumber} />
        <FormHelperText>
          Hulp getal voor het invoeren van de scores hieronder
        </FormHelperText>
      </FormControl>

      <Heading fontSize="xl" mb={4}>
        Wedstrijdpunten
      </Heading>
      {playersScoreArray?.map((score, index) => (
        <ScoreFieldArrayRow
          calculateNumber={calculateNumber}
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
