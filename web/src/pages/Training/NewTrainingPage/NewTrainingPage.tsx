import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import ControlledDatePicker from 'src/components/forms/components/ControlledDatePicker'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'
import { useGetPlayersForTeam } from 'src/pages/Team/TeamPage/hooks/useGetPlayersForTeam'

import CreateScoreFieldArrayInputs from './components/CreateScoreFieldArrayInputs'
import { useCreateTraining } from './hooks/useCreateTraining'

const NewTrainingPage = () => {
  const { playersData, playersLoading } = useGetPlayersForTeam()
  const { team, loading } = useGetTeamById()

  const {
    handleCreateTraining,
    createTrainingLoading,
    initialScoresInputValues,
    defaultTeamSeasonId,
  } = useCreateTraining({
    playersData,
    team,
  })

  if (loading || playersLoading) return null

  const validationSchema = Yup.object({
    scores: Yup.array().of(
      Yup.object().shape({
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
  })

  return (
    <>
      <MetaTags title="Nieuwe training" description="NewTraining page" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card position="relative">
            <Heading>Nieuwe training aanmaken ⚽️🏃</Heading>

            <Formik
              onSubmit={handleCreateTraining}
              initialValues={{
                trainingsDate: format(new Date(), 'yyyy-MM-dd'),
                seasonId: defaultTeamSeasonId,
                teamId: team.id,
                scores: initialScoresInputValues,
              }}
              validationSchema={validationSchema}
            >
              <Box as={Form} w="full">
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
                <CreateScoreFieldArrayInputs
                  players={playersData?.playersForTeam}
                />

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
                >
                  <Button
                    colorScheme="secondary"
                    type="submit"
                    isLoading={createTrainingLoading}
                  >
                    Opslaan
                  </Button>
                  <Text ml={4}>
                    Registreer een training en zie de scores updaten
                  </Text>
                </Flex>
              </Box>
            </Formik>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default NewTrainingPage
