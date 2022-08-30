import { useEffect } from 'react'

import { Box, Button, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Card from 'src/components/Card/Card'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import TextAlert from 'src/components/TextAlert/TextAlert'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import { useCreateSeason } from './hooks/useCreateSeason'

const NewSeasonPage = () => {
  const { currentUser } = useAuth()
  const { team } = useGetTeamById()
  const { handleCreateSeason, seasonLoading } = useCreateSeason(team)

  useEffect(() => {
    if (currentUser?.player?.playerType === 'STAFF') return

    toast.error('Je hebt geen toegang voor deze pagina')
    navigate(routes.team())
  }, [currentUser])

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(4).required('Naam is verplicht'),
  })

  return (
    <>
      <MetaTags title="Nieuw seizoen" description="Start een nieuw seizoen" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Start een nieuw seizoen 🗓️</Heading>
            <TextAlert my={8} status="info">
              <Text>
                Alle gegeven worden opgeslagen aan de hand van een{' '}
                <strong>seizoen</strong>. Let dus goed op dat je maar 1 seizoen
                actief hebt staan.
              </Text>
            </TextAlert>
            <Formik
              onSubmit={handleCreateSeason}
              initialValues={{
                name: '',
                seasonTeamName: '',
              }}
              validationSchema={validationSchema}
            >
              <Box as={Form} w="full" maxW="500px">
                <ControlledSelect
                  id="name"
                  label="Club"
                  options={['2022-2023', '2023-2024'].map((season) => ({
                    label:
                      season === '2022-2023'
                        ? `${capitalizeText(season)} - DIT JAAR 📅`
                        : capitalizeText(season),
                    value: season,
                  }))}
                  placeholder="Selecteer"
                  reactSelectProps={{ isClearable: true }}
                />

                <Button
                  mt={4}
                  colorScheme="secondary"
                  type="submit"
                  isLoading={seasonLoading}
                >
                  Start seizoen
                </Button>
              </Box>
            </Formik>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default NewSeasonPage
