import React from 'react'

import { Box, GridItem, Heading } from '@chakra-ui/react'

import Card from 'src/components/Card/Card'
import SpinnerLoader from 'src/components/Loaders/SpinnerLoader/SpinnerLoader'
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper'

import GamePresence from './components/GamePresence'
import TrainingPresence from './components/TrainingPresence'
import { useGetPlayersPresence } from './hooks/useGetTeamPresenceByTeamId'

const TeamPresence = () => {
  const { teamPresence, teamPresenceLoading } = useGetPlayersPresence()

  if (teamPresenceLoading) return null

  return (
    <>
      <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
        <SpinnerLoader isLoading={teamPresenceLoading}>
          <Card bg="primary.500" color="white" minH="400px">
            <Heading color="white">Training aanwezigheid</Heading>

            <Box mt={8}>
              <SeasonLockWrapper>
                <TrainingPresence
                  teamPresence={teamPresence}
                  isLoading={teamPresenceLoading}
                />
              </SeasonLockWrapper>
            </Box>
          </Card>
        </SpinnerLoader>
      </GridItem>
      <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
        <SpinnerLoader isLoading={teamPresenceLoading}>
          <Card bg="primary.500" color="white" minH="400px" mt={{ xl: 0 }}>
            <Heading color="white">Wedstrijd aanwezigheid</Heading>

            <Box mt={{ xl: 8 }}>
              <SeasonLockWrapper>
                <GamePresence
                  teamPresence={teamPresence}
                  isLoading={teamPresenceLoading}
                />
              </SeasonLockWrapper>
            </Box>
          </Card>
        </SpinnerLoader>
      </GridItem>
    </>
  )
}

export default TeamPresence
