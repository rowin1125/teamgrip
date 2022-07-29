import React from 'react'

import { Box, Button, Flex } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Link, routes } from '@redwoodjs/router'

import ControlledInput from 'src/components/forms/components/ControlledInput'

type SignUpFormProps = {
  initialValues: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => void
}

const SignUpForm = ({ initialValues, onSubmit }: SignUpFormProps) => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Gebruikersnaam moet wel een email zijn...')
      .min(6),
    password: Yup.string().required('Wachtwoord is verplicht').min(6),
  })
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Box as={Form} w="full">
          <ControlledInput
            id="username"
            label="Gebruikersnaam"
            placeholder="Gebruikersnaam"
          />
          <ControlledInput
            id="password"
            label="Wachtwoord"
            type="password"
            placeholder="Jouw wachtwoord"
          />
          <Flex alignItems="center" justifyContent="space-between" mt={4}>
            <Button colorScheme="secondary" type="submit">
              Registreer
            </Button>
            <Box>
              Heb je a een account?{' '}
              <Link to={routes.login()} className="rw-link">
                Login
              </Link>
            </Box>
          </Flex>
        </Box>
      )}
    </Formik>
  )
}

export default SignUpForm
