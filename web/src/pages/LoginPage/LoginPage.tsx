import { useEffect, useState } from 'react'

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import {
  ResendActivateUserMutation,
  ResendActivateUserMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { RESEND_ACTIVATE_USER } from '../SignupPage/SignupPage'

import LoginWithImage from './components/LoginWithImage'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [showResendButton, setShowResendButton] = useState(false)
  const { isAuthenticated, logIn } = useAuth()
  const [resend, { loading }] = useMutation<
    ResendActivateUserMutation,
    ResendActivateUserMutationVariables
  >(RESEND_ACTIVATE_USER, {
    onCompleted: () => {
      setShowResendButton(false)
      toast.success('Activation email sent')
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      if ((response.error as string).includes('Please validate')) {
        setEmail(data.username)
        setShowResendButton(true)
      }

      toast.error(response.error)
    } else {
      toast.success('Welcome back 🥳')
    }
  }

  const handleResend = async () =>
    await resend({
      variables: {
        input: {
          email,
        },
      },
    })

  return (
    <>
      <MetaTags title="Login" />

      <Box as="main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <Flex w="100vw" h="100vh">
          <LoginWithImage />
          <Flex
            flexDir="column"
            w="33.33%"
            bg="primary.500"
            color="white"
            justifyContent="center"
            alignItems="center"
          >
            <Box maxW="400px" w="full">
              <Heading as="h1" size="xl">
                Inloggen
              </Heading>
              <LoginForm
                onSubmit={onSubmit}
                initialValues={{ username: '', password: '' }}
              />
            </Box>
            {showResendButton && (
              <Text>
                Heb je geen email ontvangen? Verstuur hem dan nogmaals{' '}
                <Button
                  textDecoration="underline"
                  isLoading={loading}
                  variant="link"
                  onClick={handleResend}
                  mt={8}
                  colorScheme="secondary"
                >
                  hier
                </Button>
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default LoginPage
