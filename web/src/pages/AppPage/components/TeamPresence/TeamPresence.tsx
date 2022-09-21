import React from 'react'

import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'

import Card from 'src/components/Card/Card'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import GamePresence from './components/GamePresence'
import TrainingPresence from './components/TrainingPresence'
import { useGetPlayersPresence } from './hooks/useGetTeamPresenceByTeamId'

const TeamPresence = () => {
  const { teamPresence, teamPresenceLoading } = useGetPlayersPresence()
  const { isActivePlayer } = useTeamPlayerAuth()

  if (teamPresenceLoading) return null

  return (
    <>
      <GridItem colSpan={{ base: 12, xl: isActivePlayer ? 12 : 6 }} rowSpan={1}>
        <Grid
          templateColumns="repeat(12, 1fr)"
          templateRows="auto"
          gap={{ base: 0, xl: 10 }}
          rowGap={{ base: 10 }}
        >
          <GridItem
            colSpan={{ base: 12, xl: isActivePlayer ? 6 : 12 }}
            rowSpan={1}
          >
            <Card bg="primary.500" color="white">
              <Heading color="white">Training aanwezigheid</Heading>

              <Box mt={8}>
                <TrainingPresence
                  teamPresence={teamPresence}
                  isLoading={teamPresenceLoading}
                />
              </Box>
            </Card>
          </GridItem>
          <GridItem
            colSpan={{ base: 12, xl: isActivePlayer ? 6 : 12 }}
            rowSpan={1}
          >
            <Card bg="primary.500" color="white" mt={isActivePlayer ? 0 : 10}>
              <Heading color="white">Wedstrijd aanwezigheid</Heading>

              <Box mt={8}>
                <GamePresence
                  teamPresence={teamPresence}
                  isLoading={teamPresenceLoading}
                />
              </Box>
            </Card>
          </GridItem>
        </Grid>
      </GridItem>
    </>
  )
}

export default TeamPresence
