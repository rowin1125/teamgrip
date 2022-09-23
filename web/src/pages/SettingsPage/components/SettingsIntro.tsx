import React from 'react'

import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react'
import { GiLaurelsTrophy } from 'react-icons/gi'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'

const SettingsIntro = () => {
  const { currentUser } = useAuth()

  return (
    <GridItem
      colSpan={{ base: 12 }}
      flexGrow={{ xl: 1 }}
      mb={{ base: 10, xl: 0 }}
    >
      <Card h="full">
        <Flex
          flexDirection={{ base: 'column', xl: 'row' }}
          justifyContent="space-between"
          h="full"
        >
          <Flex
            alignItems="center"
            flexDirection={{ base: 'column', xl: 'row' }}
          >
            <Box>
              <Icon as={GiLaurelsTrophy} fontSize="80px" color="gold" />
            </Box>
            <Box ml={8}>
              <Heading>
                {currentUser?.userProfile?.firstname}{' '}
                {currentUser?.userProfile?.lastname}
              </Heading>
              <Text>{currentUser?.email}</Text>
            </Box>
          </Flex>

          <Flex
            alignItems={{ xl: 'center' }}
            mt={{ base: 8, xl: 0 }}
            flexDirection={{ base: 'column', xl: 'row' }}
          >
            <Button
              as={RedwoodLink}
              to={routes.club()}
              mb={{ base: 4, xl: 0 }}
              variant="outline"
              mx={{ xl: 10 }}
            >
              Mijn club
            </Button>
            <Button
              as={RedwoodLink}
              to={routes.team()}
              mb={{ base: 4, xl: 0 }}
              variant="outline"
            >
              Mijn team
            </Button>
          </Flex>
        </Flex>
      </Card>
    </GridItem>
  )
}

export default SettingsIntro
