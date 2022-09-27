import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FaArrowDown } from 'react-icons/fa'
import {
  FindTeamQuery,
  GetGameByIdQuery,
  GetPlayersForTeamQuery,
} from 'types/graphql'
import * as Yup from 'yup'

import { routes } from '@redwoodjs/router'

import ControlledDatePicker from 'src/components/forms/components/ControlledDatePicker'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import RedwoodLink from 'src/components/RedwoodLink'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

import CreateScoreFieldArrayInputs from '../NewGamePage/components/CreateScoreFieldArrayInputs'

type GameFormProps = {
  onSubmit: (values: any) => Promise<void>
  initialValues: Record<string, any>
  type: 'new' | 'edit'
  loading: boolean
  team?: FindTeamQuery['team']
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetGameByIdQuery['game']['players']
  showTop: boolean
  setShowTop: (value: boolean) => void
}

const GameForm = ({
  onSubmit,
  initialValues,
  type,
  loading,
  team,
  players,
  setShowTop,
  showTop,
}: GameFormProps) => {
  const validationSchema = Yup.object({
    scores: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        playerId: Yup.string().required(),
        points: Yup.number().required('Geef een geldige score op'),
        seasonId: Yup.string().required(),
        gameId: Yup.string(),
        type: Yup.string().required(),
        teamId: Yup.string().required(),
      })
    ),
    date: Yup.string().required(),
    seasonId: Yup.string().required(),
    teamId: Yup.string().required(),
    topGameScores: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        playerId: showTop
          ? Yup.string().required('Geef een geldige speler op')
          : Yup.string(),
        points: showTop
          ? Yup.number().required('Geef een geldige score op')
          : Yup.string(),
        seasonId: showTop ? Yup.string().required() : Yup.string(),
        trainingId: showTop ? Yup.string() : Yup.string(),
        type: showTop ? Yup.string().required() : Yup.string(),
        teamId: showTop ? Yup.string().required() : Yup.string(),
      })
    ),
  })
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Box as={Form} w="full">
        <Box w={{ base: 'full', '2xl': '50%' }}>
          <ControlledSelect
            id="seasonId"
            label="Selecteer seizoen"
            options={team?.season?.map((season) => ({
              label: capitalizeText(season.name),
              value: season?.id,
            }))}
            placeholder="Selecteer"
            reactSelectProps={{ isClearable: true }}
          />
          <ControlledDatePicker
            inline
            id="date"
            label="Wedstrijd datum"
            mb={4}
          />
        </Box>
        <CreateScoreFieldArrayInputs
          players={players}
          team={team}
          showTop={showTop}
          setShowTop={setShowTop}
        />

        <Box
          position="fixed"
          bottom={20}
          zIndex={10}
          right={4}
          display={{ base: 'block', xl: 'none' }}
        >
          <Button colorScheme="secondary" as="a" href="#save-form">
            <Icon as={FaArrowDown} />
          </Button>
        </Box>

        <Flex
          id="save-form"
          zIndex={1}
          borderTop="1px"
          borderColor="gray.300"
          pt={6}
          pb={6}
          bg="white"
          position={{ base: 'relative', xl: 'sticky' }}
          bottom={0}
          w="full"
          alignItems="center"
        >
          <Flex>
            <Button as={RedwoodLink} to={routes.team()} variant="link" mr={4}>
              Annuleer
            </Button>
            <Button colorScheme="secondary" type="submit" isLoading={loading}>
              {type === 'new' ? 'Opslaan' : 'Wijzig'}
            </Button>
          </Flex>
          <Text display={{ base: 'none', xl: 'block' }} ml={4}>
            Registreer een wedstrijd en zie de scores updaten
          </Text>
        </Flex>
      </Box>
    </Formik>
  )
}

export default GameForm
