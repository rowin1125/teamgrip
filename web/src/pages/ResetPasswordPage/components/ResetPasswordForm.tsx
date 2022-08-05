import { Box, Button, Flex } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { routes } from '@redwoodjs/router'

import ControlledInput from 'src/components/forms/components/ControlledInput'
import RedwoodLink from 'src/components/RedwoodLink'

type ResetPasswordFormProps = {
  initialValues: Record<string, unknown>
  onSubmit: (
    values: Record<string, unknown>,
    actions: FormikHelpers<unknown>
  ) => void
  disabled?: boolean
  showLoginLink?: boolean
  loading?: boolean
}

const ResetPasswordForm = ({
  initialValues,
  disabled,
  onSubmit,
  showLoginLink,
  loading,
}: ResetPasswordFormProps) => {
  const validationSchema = Yup.object({
    password: Yup.string().min(
      6,
      'Wachtwoord moet minimaal 6 karakters lang zijn...'
    ),
  })
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Box as={Form} w="full">
        <ControlledInput
          isDisabled={disabled}
          id="password"
          label="Wachtwoord"
          type="password"
          placeholder="Geef een veilig wachtwoord op!"
        />

        <Flex alignItems="center" justifyContent="space-between" mt={4}>
          <Button
            colorScheme="secondary"
            type="submit"
            isDisabled={disabled}
            isLoading={loading}
          >
            Herstel je wachtwoord
          </Button>
          {showLoginLink && (
            <Flex alignItems="center" justifyContent="space-between" mt={4}>
              <Box>
                Ga naar {''}
                <RedwoodLink to={routes.login()} className="rw-link">
                  Login
                </RedwoodLink>
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
    </Formik>
  )
}

export default ResetPasswordForm
