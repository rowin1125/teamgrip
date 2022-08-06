import { useEffect, useState } from 'react'

import { Box, Flex, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ForgotPasswordForm from './components/ForgotPasswordForm'
import ForgotPasswordWithImage from './components/ForgotpasswordWithImage'

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.app())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await forgotPassword(data.username)

    if (response.error && !response?.error.includes('Username incorrect')) {
      // Prevent fishing, but still show the error when a valid error occurs
      toast.error(response.error)
      setLoading(false)
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

      <Flex
        w="100vw"
        h={{ base: '100%', xl: 'calc(100vh - 80px)' }}
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        <ForgotPasswordWithImage />
        <Flex
          order={{ base: 1, xl: 0 }}
          flexDir="column"
          w={{ base: '100%', xl: '33.33%' }}
          bg="primary.500"
          color="white"
          justifyContent="center"
          alignItems="center"
          minH="calc(100vh - 300px - 80px)"
        >
          <Box maxW="400px" w="full" p={{ base: 4, xl: 0 }}>
            <Heading as="h1" size="xl">
              Wachtwoord vergeten
            </Heading>
            <ForgotPasswordForm
              onSubmit={onSubmit}
              loading={loading}
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
