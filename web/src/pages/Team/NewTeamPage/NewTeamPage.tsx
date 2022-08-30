import { Grid, GridItem, Heading, Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { CreateTeamInput, FindClubs } from 'types/graphql'
import * as Yup from 'yup'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Card from 'src/components/Card/Card'
import ControlledInput from 'src/components/forms/components/ControlledInput'
import ControlledSelect from 'src/components/forms/components/ControlledSelect'
import ControlledSwitch from 'src/components/forms/components/ControlledSwitch/ControlledSwitch'
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'
import { FIND_TEAM_QUERY } from 'src/hooks/api/query/useGetTeamById'

import { handleTeamNameTransformation } from './helpers/handleTeamnameTransformation/handleTeamnameTransformation'

const GET_CLUBS_QUERY = gql`
  query GetClubsQuery {
    clubs {
      id
      name
    }
  }
`

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeamMutation($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
    }
  }
`

const NewTeamPage = () => {
  const { currentUser, reauthenticate } = useAuth()
  const { data } = useQuery<FindClubs>(GET_CLUBS_QUERY)
  const [createTeam, { loading }] = useMutation(CREATE_TEAM_MUTATION, {
    onCompleted: reauthenticate,
    refetchQueries: [FIND_TEAM_QUERY],
  })

  const validationSchema = Yup.object().shape({
    clubId: Yup.string().required('Club is verplicht'),
    name: Yup.string().min(4).required('Naam is verplicht'),
  })

  const handleSubmit = async (values: CreateTeamInput) => {
    const teamNameContainsClubName = values.name
      .toLowerCase()
      .includes(
        data.clubs
          .find((club) => club.id === values.clubId)
          ?.name?.toLowerCase()
      )
    if (teamNameContainsClubName) {
      toast.error('Clubnaam mag niet in teamnaam zitten')
      return
    }

    try {
      const team = await createTeam({
        variables: { input: values },
      })
      toast.success(`Team ${team.data.createTeam.name} aangemaakt`)
      navigate(routes.team())
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <MetaTags title="Nieuwe team" description="NewTeam page" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Maak nu je eigen team aan 💪</Heading>
            <Formik
              onSubmit={handleSubmit}
              initialValues={{
                name: '',
                clubId: '',
                ownerId: currentUser?.id,
                ownerIsPlayer: false,
              }}
              validationSchema={validationSchema}
            >
              {({ values }) => {
                const { name, clubId } = values
                const club = data?.clubs?.find((club) => club.id === clubId)
                const customTeamName =
                  club &&
                  name &&
                  `${capitalizeText(club.name)} ${capitalizeText(name)}`
                return (
                  <Box as={Form} w="full" maxW="500px">
                    <ControlledSelect
                      id="clubId"
                      label="Club"
                      options={data?.clubs?.map(({ name, id }) => ({
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
                      helperText="Actieveer als je zelf als speler deelneemt aan de training / competitie van het team."
                    >
                      Is speler van het team?
                    </ControlledSwitch>
                    <Button
                      mt={8}
                      colorScheme="secondary"
                      type="submit"
                      isLoading={loading}
                    >
                      Maak {customTeamName ? customTeamName : 'team'} aan
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

export default NewTeamPage
