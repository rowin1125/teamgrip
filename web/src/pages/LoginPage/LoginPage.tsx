import { useEffect, useState } from 'react'

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import {
  ResendActivateUserMutation,
  ResendActivateUserMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { RESEND_ACTIVATE_USER } from '../SignupPage/SignupPage'

import LoginWithImage from './components/LoginWithImage'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [loadingLogin, setLoadingLogin] = useState(false)
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
    setLoadingLogin(true)
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
    setLoadingLogin(false)
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
        <Flex
          w="100vw"
          h={{ base: '100%', xl: 'calc(100vh - 80px)' }}
          flexDirection={{ base: 'column', xl: 'row' }}
        >
          <LoginWithImage />
          <Flex
            order={{ base: 1, xl: 0 }}
            flexDir="column"
            w={{ base: '100%', xl: '33.33%' }}
            bg="primary.500"
            color="white"
            justifyContent="center"
            minH="calc(100vh - 300px - 80px)"
            alignItems="center"
          >
            <Box maxW="400px" w="full" p={{ base: 4, xl: 0 }}>
              <Heading as="h1" size="xl">
                Inloggen
              </Heading>
              <LoginForm
                onSubmit={onSubmit}
                loading={loadingLogin}
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
