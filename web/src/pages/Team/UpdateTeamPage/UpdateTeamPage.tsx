import { Grid, GridItem, Heading, Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import ControlledInput from 'src/components/forms/components/ControlledInput'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import ControlledSwitch from 'src/components/forms/components/ControlledSwitch/ControlledSwitch'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import { handleTeamNameTransformation } from '../NewTeamPage/helpers/handleTeamnameTransformation/handleTeamnameTransformation'
import { useGetClubs } from '../NewTeamPage/hooks/useGetClubs'

import { useUpdateTeam } from './hooks/useUpdateTeam'

const UpdateTeamPage = () => {
  const { currentUser, loading: authLoading } = useAuth()
  const { clubs } = useGetClubs()
  const { team, loading } = useGetTeamById()
  const { handleUpdateTeam, updateTeamLoading } = useUpdateTeam(clubs)

  const validationSchema = Yup.object().shape({
    clubId: Yup.string().required('Club is verplicht'),
    name: Yup.string().min(4).required('Naam is verplicht'),
  })
  if (loading || authLoading) return null

  return (
    <>
      <MetaTags
        title="Update je team"
        description="Update de gegevens van je team"
      />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Maak nu je eigen team aan 💪</Heading>
            <Formik
              onSubmit={handleUpdateTeam}
              initialValues={{
                name: team?.name || '',
                clubId: team?.club?.id || '',
                ownerId: currentUser?.id || '',
                ownerIsPlayer: currentUser?.player?.isActivePlayer || false,
                clubTeamName: team?.clubTeamName || '',
              }}
              validationSchema={validationSchema}
            >
              {({ values }) => {
                const { name, clubId } = values
                const club = clubs?.find((club) => club.id === clubId)
                const customTeamName =
                  club &&
                  name &&
                  `${capitalizeText(club.name)} ${capitalizeText(name)}`
                return (
                  <Box as={Form} w="full" maxW="500px">
                    <ControlledSelect
                      id="clubId"
                      label="Club"
                      options={clubs?.map(({ name, id }) => ({
                        label: capitalizeText(name),
                        value: id,
                      }))}
                      placeholder="Selecteer"
                      reactSelectProps={{ isClearable: true }}
                    />
                    <ControlledInput
                      id="name"
                      label="Teamnaam"
                      placeholder="Zaterdag-1"
                      transformValue={handleTeamNameTransformation}
                      helperText="Letop: De teamnaam mag alleen bestaan uit nummers, letters en dashes: Zaterdag-1, Zatedag-JO-17-2"
                    />
                    <ControlledSwitch
                      id="ownerIsPlayer"
                      helperText="Actieveer dit als de eigenaar zelf als speler wilt deelnemen aan de training / competitie van het team."
                    >
                      Eigenaar is een actieve speler van het team?
                    </ControlledSwitch>
                    <Button
                      mt={8}
                      colorScheme="secondary"
                      type="submit"
                      isLoading={updateTeamLoading}
                    >
                      Update {customTeamName ? customTeamName : 'team'}
                    </Button>
                  </Box>
                )
              }}
            </Formik>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default UpdateTeamPage
