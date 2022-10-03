import React from 'react'

import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import { routes } from '@redwoodjs/router'

import ControlledInput from 'src/components/forms/components/ControlledInput'
import RedwoodLink from 'src/components/RedwoodLink'

type LoginFormProps = {
  initialValues: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => Promise<void>
  loading: boolean
  showSignUp?: boolean
}

const LoginForm = ({
  initialValues,
  onSubmit,
  loading,
  showSignUp = true,
}: LoginFormProps) => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .email('Email moet wel een email zijn...')
      .required('Veld is verplicht'),
    password: Yup.string().required('Wachtwoord is verplicht'),
  })
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <FormikForm>
        <ControlledInput
          id="username"
          label="Email"
          placeholder="ronaldo@gmail.nl"
        />
        <ControlledInput
          id="password"
          label="Password"
          type="password"
          placeholder="super geheim wachtwoord 🤫"
          formControlProps={{ mb: 1 }}
        />
        <Flex alignItems="center" justifyContent="flex-end" mt={0}>
          <Link as={RedwoodLink} color="gray.500" to={routes.forgotPassword()}>
            Wachtwoord vergeten?
          </Link>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" mt={4}>
          <Button colorScheme="secondary" type="submit" isLoading={loading}>
            Login
          </Button>
          {showSignUp && (
            <Box>
              Heb je nog geen account?{' '}
              <Link as={RedwoodLink} textDecor="underline" to={routes.signup()}>
                Registeer
              </Link>
            </Box>
          )}
        </Flex>
      </FormikForm>
    </Formik>
  )
}

export default LoginForm
