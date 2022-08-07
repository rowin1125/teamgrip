import React from 'react'

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'

const ProfileSettings = () => {
  const { currentUser } = useAuth()

  return (
    <GridItem
      colSpan={{ base: 12, xl: 4 }}
      flexGrow={{ xl: 1 }}
      mb={{ base: 10, xl: 0 }}
    >
      <Card h="full">
        <Flex flexDirection="column" justifyContent="space-between" h="full">
          <Box>
            <Heading size="md">Mijn profiel</Heading>
            <Grid templateColumns="repeat(3, 1fr)" mt={4} gap={2}>
              <GridItem colSpan={1}>
                <Text fontWeight="bold" color="black">
                  Voornaam:
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{currentUser?.userProfile?.firstname}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="bold" color="black">
                  Achternaam:
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{currentUser?.userProfile?.lastname}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="bold" color="black">
                  Email:
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>{currentUser?.email}</Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Text fontWeight="bold" color="black">
                  Club:
                </Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Text fontWeight="bold" color="black">
                  Team:
                </Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text fontWeight="bold" color="black">
                  Totaal score:
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Text>0</Text>
              </GridItem>
            </Grid>
          </Box>
          <Button as={RedwoodLink} to={routes.app()} mt={{ base: 8, xl: 0 }}>
            Wijzig profiel
          </Button>
        </Flex>
      </Card>
    </GridItem>
  )
}

export default ProfileSettings
