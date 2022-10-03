import { Grid, GridItem, Heading, Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import {
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from 'types/graphql'
import * as Yup from 'yup'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Card from 'src/components/Card/Card'
import ControlledInput from 'src/components/forms/components/ControlledInput'

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfileMutation(
    $id: String!
    $input: UpdateUserProfileInput!
  ) {
    updateUserProfile(id: $id, input: $input) {
      id
    }
  }
`

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('Vul je voornaam in'),
  lastname: Yup.string().required('Vul je achternaam in'),
})

const UpdateUserPage = () => {
  const { currentUser, reauthenticate } = useAuth()

  const [updateUserProfile, { loading }] = useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(UPDATE_USER_PROFILE, {
    onCompleted: reauthenticate,
  })

  const onSubmit = async (
    data: UpdateUserProfileMutationVariables['input']
  ) => {
    if (!currentUser) {
      toast.error('Fout met het ophalen van je gegevens')
      return
    }
    try {
      await updateUserProfile({
        variables: { input: data, id: currentUser.id },
      })
      toast.success('Profiel is succesvol aangepast 👍')
      navigate(routes.settings())
    } catch (error) {
      console.error(error)
      toast.error('Oeps er is iets fout gegaan 😢')
    }
  }

  return (
    <>
      <MetaTags title="Update user" description="UpdateUser page" />

      <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
        <GridItem colSpan={{ base: 3, xl: 2 }}>
          <Card>
            <Heading>Update jouw informatie</Heading>
            <Formik
              initialValues={{
                firstname: currentUser?.userProfile?.firstname,
                lastname: currentUser?.userProfile?.lastname,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Box as={Form} w="full" maxW="500px">
                <ControlledInput
                  id="firstname"
                  label="Voornaam"
                  placeholder="Erling"
                />
                <ControlledInput
                  id="lastname"
                  label="Achternaam"
                  placeholder="Håland"
                />
                <Button
                  colorScheme="secondary"
                  type="submit"
                  mt={4}
                  isLoading={loading}
                >
                  Update profiel
                </Button>
              </Box>
            </Formik>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default UpdateUserPage
