import { useEffect, useState } from 'react'

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import {
  ResendActivateUserMutation,
  ResendActivateUserMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import footballNightMan from './login-bg.jpg'
import SignUpForm from './SignUpForm'

const RESEND_ACTIVATE_USER = gql`
  mutation ResendActivateUserMutation($input: ResendActivateUserInput!) {
    resendActivateUser(input: $input) {
      id
      verifiedToken
    }
  }
`

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()
  const [showResendButton, setShowResendButton] = useState(false)
  const [email, setEmail] = useState('')
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
    const response = await signUp({ ...data })

    if (response.message) {
      toast.success(response.message)
    } else if (response.error) {
      setEmail(data.username)
      setShowResendButton(true)
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Flex w="100vw" h="100vh">
        <Box w="66.66%" position="relative">
          <Box
            h="100%"
            bg="primary.500"
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex="-1"
          >
            <Image
              filter="auto"
              blur="1px"
              brightness="0.8"
              src={footballNightMan}
              objectFit="cover"
              w="full"
              h="full"
            />
            <Box
              bg="primary.500"
              opacity={0.7}
              bgGradient="linear(to-tl, primary.500, gray.900)"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
            />
            <Box
              position="absolute"
              inset={0}
              display="flex"
              pl={8}
              justifyContent="center"
              textAlign="center"
              w="full"
              h="full"
              zIndex={1}
              color="white"
            >
              <Box mt="25vh">
                <Heading size="4xl">Jouw eigen team</Heading>
                <Text mt={4} fontSize="3xl">
                  Alle data binnen handbereik
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Flex
          flexDir="column"
          w="33.33%"
          bg="primary.500"
          color="white"
          justifyContent="center"
          alignItems="center"
        >
          <Box maxW="400px" w="full">
            <SignUpForm
              onSubmit={onSubmit}
              initialValues={{
                username: 'rowinmol648@gmail.com',
                password: '123456',
              }}
            />
          </Box>
          {showResendButton && (
            <Text>
              Heb je geen email ontvangen? Verstuur hem dan nogmaals{' '}
              <Button
                textDecoration="underline"
                isLoading={loading}
                variant="link"
                onClick={async () =>
                  await resend({
                    variables: {
                      input: {
                        email,
                      },
                    },
                  })
                }
                mt={8}
                colorScheme="secondary"
              >
                hier
              </Button>{' '}
              .
            </Text>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default SignupPage
