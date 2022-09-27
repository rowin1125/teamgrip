import { useState } from 'react'

import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
} from '@chakra-ui/react'
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
  team?: FindTeamQuery['team']
  showTop: boolean
  setShowTop: (value: boolean) => void
}

const SingleScoreField = ({
  push,
  remove,
  players,
  team,
  setShowTop,
  showTop,
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

      <FormControl id="showTop" mb={showTop ? 4 : 8}>
        <FormLabel fontSize="xl" fontWeight="bold" htmlFor="showTop">
          Top Speler toevoegen?
        </FormLabel>
        <Flex alignItems="center">
          <Switch
            id={'showTop'}
            isChecked={showTop}
            mt={0}
            onChange={(event) => setShowTop(event.target.checked)}
          />
          <Text fontSize="md" ml={4}>
            Actief
          </Text>
        </Flex>
      </FormControl>

      {showTop && (
        <>
          <Heading fontSize="xl" mb={4}>
            Top 3 training
          </Heading>
          <Box w={{ base: 'full', '2xl': '50%' }} mb={8}>
            {values.topTrainingScores.map((_, index) => {
              return (
                <SingleTopTrainingScores
                  key={`topTrainingScores.${index}.playerId`}
                  players={players}
                  index={index}
                />
              )
            })}
          </Box>
        </>
      )}

      <Heading fontSize="xl" mb={4}>
        Spelers toevoegen voor de training
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
        Trainingspunten
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
