import React from 'react'

import { Box, Button, Heading } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import {
  ActivateUserInput,
  ActivateUserMutation,
  ActivateUserMutationVariables,
} from 'types/graphql'
import * as Yup from 'yup'

import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ControlledInput from 'src/components/forms/components/ControlledInput'

const ACTIVATE_USER = gql`
  mutation ActivateUserMutation($input: ActivateUserInput!) {
    activateUser(input: $input) {
      id
      email
    }
  }
`

type ActivateFormProps = {
  setActivateStep: (step: number) => void
}

const ActivateForm = ({ setActivateStep }: ActivateFormProps) => {
  const { logIn } = useAuth()
  const { token, email } = useParams()
  const decodedEmail = decodeURI(email)

  const [activate, { loading }] = useMutation<
    ActivateUserMutation,
    ActivateUserMutationVariables
  >(ACTIVATE_USER)

  const onSubmit = async (data: ActivateUserInput) => {
    try {
      const result = await logIn({
        username: decodedEmail,
        password: data.password,
        token,
      })
      if ((result.error as string).includes('Incorrect password')) {
        toast.error('Incorrect password')
        return
      }

      // Workaround for making sure the password is correct before activating someone
      if ((result.error as string).includes('Please validate')) {
        await activate({ variables: { input: { ...data, token } } })
        await logIn({
          username: decodedEmail,
          password: data.password,
        })
        setActivateStep(1)
        toast.success('OMG gelukt! Welkom bij de TeamStats familie ⚽️!')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <Formik
      initialValues={{
        token,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={onSubmit}
    >
      <Box as={Form} w="full">
        <Heading>Bijna klaar hoor!</Heading>
        <ControlledInput
          id="password"
          label="Bevestig je wachtwoord en activeer"
          placeholder="Jouw super geheime wachtwoord"
          type="password"
        />
        <Button
          colorScheme="secondary"
          type="submit"
          mt={4}
          isLoading={loading}
        >
          Activeer
        </Button>
      </Box>
    </Formik>
  )
}

export default ActivateForm
