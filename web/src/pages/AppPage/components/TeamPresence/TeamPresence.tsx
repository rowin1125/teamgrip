import React from 'react'

import { Box, Flex, GridItem, Heading } from '@chakra-ui/react'

import Card from 'src/components/Card/Card'

import GamePresence from './components/GamePresence'
import TrainingPresence from './components/TrainingPresence'
import { useGetPlayersPresence } from './hooks/useGetTeamPresenceByTeamId'

const TeamPresence = () => {
  const { teamPresence, teamPresenceLoading } = useGetPlayersPresence()

  if (teamPresenceLoading) return null

  return (
    <>
      <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
        <Flex flexDir="column">
          <Card bg="primary.500" color="white">
            <Heading color="white">Training aanwezigheid</Heading>

            <Box mt={8}>
              <TrainingPresence
                teamPresence={teamPresence}
                isLoading={teamPresenceLoading}
              />
            </Box>
          </Card>
          <Card bg="primary.500" color="white" mt={10}>
            <Heading color="white">Wedstrijd aanwezigheid</Heading>

            <Box mt={8}>
              <GamePresence
                teamPresence={teamPresence}
                isLoading={teamPresenceLoading}
              />
            </Box>
          </Card>
        </Flex>
      </GridItem>
    </>
  )
}

export default TeamPresence
