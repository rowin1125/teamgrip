import { Box, Flex, Heading, Image, Link } from '@chakra-ui/react'

import { Link as RedwoodLink, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import Footer from 'src/components/Footer/Footer'

import './AuthLayout.scss'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box bg="primary.500">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Flex justifyContent="space-between" px={4} position="fixed" zIndex="1">
        <Link
          display="flex"
          as={RedwoodLink}
          to={routes.home()}
          alignItems="center"
        >
          <Image h="80px" src="/TeamStats Logo.png" alt="Redwood" />
          <Heading size="lg" color="white" pl={4}>
            TeamsStats
          </Heading>
        </Link>
      </Flex>
      <Box>{children}</Box>
      <Footer inverse />
    </Box>
  )
}

export default AuthLayout
