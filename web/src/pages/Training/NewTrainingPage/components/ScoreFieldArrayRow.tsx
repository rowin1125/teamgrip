import React from 'react'

import { Button, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { CgClose } from 'react-icons/cg'
import { FaMinus, FaPlus } from 'react-icons/fa'
import {
  CreateScoreInput,
  CreateTrainingInput,
  GetPlayersForTeamQuery,
} from 'types/graphql'

import ControlledInput from 'src/components/forms/components/ControlledInput'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

type FormikValues = {
  input: CreateTrainingInput
  scores: CreateScoreInput[]
}
type ScoreFieldArrayRowProps = {
  index: number
  players: GetPlayersForTeamQuery['playersForTeam']
  score: CreateScoreInput
  handleRemove: (
    currentPlayer: GetPlayersForTeamQuery['playersForTeam'][0],
    index: number
  ) => void
}

const ScoreFieldArrayRow = ({
  index,
  players,
  score,
  handleRemove,
}: ScoreFieldArrayRowProps) => {
  const { values, setFieldValue } = useFormikContext<FormikValues>()

  const id = `scores.${index}.points`
  const calculateNumber = 25
  const currentPlayer = players.find((item) => item.id === score.playerId)

  const handleAddPoints = () => {
    const currentValue = values.scores[index].points
    setFieldValue(id, +currentValue + calculateNumber)
  }
  const handleMinusPoints = () => {
    const currentValue = values.scores[index].points

    if (currentValue - calculateNumber < 0) {
      setFieldValue(id, 0)
      return
    }
    setFieldValue(id, currentValue - calculateNumber)
  }
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      gap={4}
      key={players[index].displayName}
    >
      <GridItem colSpan={9}>
        <Flex>
          <Flex mt={6} mr={6}>
            <Button colorScheme="red" onClick={handleMinusPoints}>
              <Icon as={FaMinus} />{' '}
              <Text color="white" position="relative" top="2px">
                25
              </Text>
            </Button>
          </Flex>
          <ControlledInput
            label={capitalizeText(currentPlayer?.displayName)}
            labelProps={{ m: 0 }}
            id={`scores.${index}.points`}
            mr={2}
            maxW="200px"
            type="number"
          />
          <Flex pt={6} ml={4}>
            <Button colorScheme="green" onClick={handleAddPoints}>
              <Icon as={FaPlus} />{' '}
              <Text color="white" position="relative" top="2px">
                25
              </Text>
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleRemove(currentPlayer, index)}
            >
              <Icon as={CgClose} color="red" />
            </Button>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default ScoreFieldArrayRow
