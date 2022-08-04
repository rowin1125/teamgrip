import { useEffect } from 'react'

import { Box, Flex, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordWithImage from './components/ForgotpasswordWithImage'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error && !response?.error.includes('Username incorrect')) {
      // Prevent fishing, but still show the error when a valid error occurs
      toast.error(response.error)
      return
    }
    toast.success(
      `Indien jou email ${data.username} is gevonden, krijg je een email met een link om je wachtwoord te resetten.`
    )

    navigate(routes.login())
  }

  return (
    <>
      <MetaTags title="Wachtwoord vergeten" />

      <Flex w="100vw" h="100vh">
        <ForgotPasswordWithImage />
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
              Wachtwoord vergeten
            </Heading>
            <ForgotPasswordForm
              onSubmit={onSubmit}
              initialValues={{
                username: '',
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default ForgotPasswordPage
