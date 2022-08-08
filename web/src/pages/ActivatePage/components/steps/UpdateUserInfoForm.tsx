import React, { useEffect } from 'react'

import { Box, Heading, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import {
  UpdateUserProfileMutationVariables,
  UpdateUserProfileMutation,
  UpdateUserProfileInput,
} from 'types/graphql'
import * as Yup from 'yup'

import { useAuth } from '@redwoodjs/auth'
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
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('Vul je voornaam in'),
  lastname: Yup.string().required('Vul je achternaam in'),
})

type UpdateUserInfoFormProps = {
  setActivateStep: (step: number) => void
  handlePlayVideo: () => void
}

const UpdateUserInfoForm = ({ setActivateStep }: UpdateUserInfoFormProps) => {
  const { currentUser } = useAuth()
  const [updateUserProfile, { loading }] = useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(UPDATE_USER_PROFILE)

  const onSubmit = async (data: UpdateUserProfileInput) => {
    try {
      await updateUserProfile({
        variables: { input: data, id: currentUser.id },
      })
      setActivateStep(2)
      toast.success('Informatie verwerkt, nog 1 stapje 🎈')
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (
      currentUser?.userProfile.lastname ||
      currentUser?.userProfile.firstname
    ) {
      setActivateStep(2)
    }
  }, [currentUser, setActivateStep])

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
