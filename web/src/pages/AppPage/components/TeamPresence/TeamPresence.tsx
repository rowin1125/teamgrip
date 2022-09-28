import React from 'react'

import { Box, GridItem, Heading } from '@chakra-ui/react'

import Card from 'src/components/Card/Card'
import ChartLoader from 'src/components/Loaders/ChartLoader/ChartLoader'
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper'
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
      <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
        <ChartLoader isLoading={teamPresenceLoading}>
          <Card bg="primary.500" color="white">
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
        </ChartLoader>
      </GridItem>
      <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
        <ChartLoader isLoading={teamPresenceLoading}>
          <Card
            bg="primary.500"
            color="white"
            mt={{ xl: isActivePlayer ? 0 : 10 }}
          >
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
        </ChartLoader>
      </GridItem>
    </>
  )
}

export default TeamPresence
