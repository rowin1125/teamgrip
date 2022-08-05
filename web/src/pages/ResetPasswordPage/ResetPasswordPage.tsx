import { useEffect, useState } from 'react'

import { Box, Flex, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResetPasswordForm from './components/ResetPasswordForm'
import ResetPasswordWithImage from './components/ResetPasswordWithImage'

const ResetPasswordPage = ({ resetToken }) => {
  const [showLoginLink, setShowLoginLink] = useState(false)
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
      if (response.error.includes('hetzelfde')) {
        setShowLoginLink(true)
      }
    } else {
      toast.success('Wachtwoord aangepast')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Wachtwoord resetten" />

      <Flex
        w="100vw"
        h={{ base: '100%', xl: '100vh' }}
        flexDirection={{ base: 'column', xl: 'row' }}
      >
        {' '}
        <ResetPasswordWithImage />
        <Flex
          order={{ base: 1, xl: 0 }}
          flexDir="column"
          w={{ base: '100%', xl: '33.33%' }}
          bg="primary.500"
          color="white"
          justifyContent="center"
          alignItems="center"
          minH="calc(50vh - 80px)"
        >
          <Box maxW="400px" w="full" p={{ base: 4, xl: 0 }}>
            <Heading as="h1" size="xl">
              Reset wachtwoord
            </Heading>
            <ResetPasswordForm
              disabled={!enabled}
              showLoginLink={showLoginLink}
              onSubmit={onSubmit}
              initialValues={{
                username: '',
                password: '',
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default ResetPasswordPage
