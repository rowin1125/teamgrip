import { Box, Button, Flex } from '@chakra-ui/react'

import { routes } from '@redwoodjs/router'

import RedwoodLink from 'src/components/RedwoodLink'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

import Cavemen from './components/CaveMen/Cavemen'

export default () => (
  <AuthLayout>
    <Box as="main" bg="primary.500" h="100vh" w="100vw">
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        h="full"
        flexDir="column"
      >
        <Cavemen />
        <Button
          colorScheme="secondary"
          as={RedwoodLink}
          to={routes.home()}
          mb={40}
        >
          Terug naar home
        </Button>
      </Flex>
    </Box>
  </AuthLayout>
)
