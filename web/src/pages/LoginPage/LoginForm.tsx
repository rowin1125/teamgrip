import React from 'react'

import { Box, Button, Flex } from '@chakra-ui/react'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import { Link, routes } from '@redwoodjs/router'

import ControlledInput from 'src/components/forms/components/ControlledInput'

type LoginFormProps = {
  initialValues: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => Promise<void>
}

const LoginForm = ({ initialValues, onSubmit }: LoginFormProps) => {
  const validationSchema = Yup.object({
    username: Yup.string().required('Email moet wel een email zijn...'),
    password: Yup.string().required('Wachtwoord is verplicht'),
  })
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <FormikForm>
            <ControlledInput
              id="username"
              label="Username"
              placeholder="ronaldo@gmail.nl"
            />
            <ControlledInput
              id="password"
              label="Password"
              type="password"
              placeholder="super geheim wachtwoord 🤫"
            />
            <Flex alignItems="center" justifyContent="space-between" mt={4}>
              <Button colorScheme="secondary" type="submit">
                Login
              </Button>
              <Box>
                Heb je nog geen account?{' '}
                <Link to={routes.signup()} className="rw-link">
                  Registeer
                </Link>
              </Box>
            </Flex>
          </FormikForm>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
