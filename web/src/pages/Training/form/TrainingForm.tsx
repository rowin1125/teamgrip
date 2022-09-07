import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import {
  FindTeamQuery,
  GetPlayersForTeamQuery,
  GetTrainingByIdQuery,
} from 'types/graphql'
import * as Yup from 'yup'

import { routes } from '@redwoodjs/router'

import ControlledDatePicker from 'src/components/forms/components/ControlledDatePicker'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import RedwoodLink from 'src/components/RedwoodLink'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

import CreateScoreFieldArrayInputs from '../NewTrainingPage/components/CreateScoreFieldArrayInputs'

type TrainingFormProps = {
  onSubmit: (values: any) => Promise<void>
  initialValues: Record<string, any>
  type: 'new' | 'edit'
  loading: boolean
  team?: FindTeamQuery['team'] | GetTrainingByIdQuery['training']['team']
  players?:
    | GetPlayersForTeamQuery['playersForTeam']
    | GetTrainingByIdQuery['training']['players']
}

const validationSchema = Yup.object({
  scores: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      playerId: Yup.string().required(),
      points: Yup.number().required('Geef een geldige score op'),
      seasonId: Yup.string().required(),
      trainingId: Yup.string(),
      type: Yup.string().required(),
      teamId: Yup.string().required(),
    })
  ),
  trainingsDate: Yup.string().required(),
  seasonId: Yup.string().required(),
  teamId: Yup.string().required(),
  topTrainingScores: Yup.array().of(
    Yup.object().shape({
      id: Yup.string(),
      playerId: Yup.string().required('Geef een geldige speler op'),
      points: Yup.number().required('Geef een geldige score op'),
      seasonId: Yup.string().required(),
      trainingId: Yup.string(),
      type: Yup.string().required(),
      teamId: Yup.string().required(),
    })
  ),
})

const TrainingForm = ({
  onSubmit,
  initialValues,
  type,
  loading,
  team,
  players,
}: TrainingFormProps) => {
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
            id="trainingsDate"
            label="Trainings datum"
            mb={4}
          />
        </Box>
        <CreateScoreFieldArrayInputs players={players} team={team} />

        <Flex
          borderTop="1px"
          borderColor="gray.300"
          pt={6}
          pb={6}
          bg="white"
          position="sticky"
          bottom="0px"
          w="full"
          alignItems="center"
          flexDir={{ base: 'column', xl: 'row' }}
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
            Registreer een training en zie de scores updaten
          </Text>
        </Flex>
      </Box>
    </Formik>
  )
}

export default TrainingForm
