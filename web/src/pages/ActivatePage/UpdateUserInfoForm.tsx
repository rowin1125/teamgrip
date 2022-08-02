import React from 'react'

import { Box, Heading, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import {
  UpdateUserProfileMutationVariables,
  UpdateUserProfileMutation,
  UpdateUserProfileInput,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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

const UpdateUserInfoForm = () => {
  const { currentUser } = useAuth()
  const [updateUserProfile, { loading }] = useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(UPDATE_USER_PROFILE)
  console.log('currentUser', currentUser)

  const onSubmit = async (data: UpdateUserProfileInput) => {
    try {
      await updateUserProfile({
        variables: { input: data, id: currentUser.id },
      })
      navigate(routes.home())
      toast.success('Informatie verwerkt, nog 1 stapje 🎈')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
      }}
      onSubmit={onSubmit}
    >
      <Box as={Form} w="full">
        <Heading>Even wat administatie 📃</Heading>
        <ControlledInput id="firstname" label="Voornaam" placeholder="Erling" />
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
          Volgende stap
        </Button>
      </Box>
    </Formik>
  )
}
export default UpdateUserInfoForm
