import React from 'react'

import { GridItem, Heading } from '@chakra-ui/react'

import PlayerCard from 'src/components/PlayerCard/PlayerCard'
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import PlayerRecentGames from '../PlayerRecentGames'
import PlayerRecentTrainings from '../PlayerRecentTrainings'
import TopTeamPlayers from '../TopTeamPlayers'

const PlayerDashboard = () => {
  const { team } = useGetTeamById()

  return (
    <>
      <GridItem colSpan={{ base: 12 }} rowSpan={1}>
        <Heading as="h1" size="2xl" color="white">
          Jouw dashboard
        </Heading>
        {team && (
          <Heading as="h1" size="lg" color="white" mt={4}>
            {team.club.name} - {team.name}
          </Heading>
        )}
      </GridItem>
      <GridItem colSpan={{ base: 12, xl: 5 }} rowSpan={1} justifySelf="center">
        <PlayerCard />
      </GridItem>
      <GridItem colSpan={{ base: 12, xl: 7 }} rowSpan={1}>
        <SeasonLockWrapper>
          <PlayerRecentTrainings />
        </SeasonLockWrapper>
      </GridItem>
      <GridItem
        colSpan={{ base: 12, xl: 5 }}
        rowSpan={1}
        order={{ base: 10, xl: 'unset' }}
      >
        <TopTeamPlayers amount={10} />
      </GridItem>
      <GridItem colSpan={{ base: 12, xl: 7 }} rowSpan={1}>
        <SeasonLockWrapper>
          <PlayerRecentGames />
        </SeasonLockWrapper>
      </GridItem>
    </>
  )
}

export default PlayerDashboard
