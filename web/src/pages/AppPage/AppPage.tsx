import { Grid, GridItem, Heading } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import PlayerCard from 'src/components/PlayerCard/PlayerCard'
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import PlayerRecentGames from './components/PlayerRecentGames'
import PlayerRecentTrainings from './components/PlayerRecentTrainings'
import TeamPresence from './components/TeamPresence'
import TopTeamPlayers from './components/TopTeamPlayers'

const AppPage = () => {
  const { team } = useGetTeamById()
  const { isActivePlayer } = useTeamPlayerAuth()

  return (
    <>
      <MetaTags
        title="Dashboard"
        description="Dashboard overzicht van jouw gegevens binnen het team"
      />

      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="auto"
        gap={{ base: 0, xl: 10 }}
        rowGap={{ base: 10 }}
      >
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

        {isActivePlayer && (
          <>
            <GridItem
              colSpan={{ base: 12, xl: 6 }}
              rowSpan={1}
              justifySelf="center"
              alignSelf="center"
            >
              <PlayerCard />
            </GridItem>
            <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
              <SeasonLockWrapper>
                <PlayerRecentTrainings />
              </SeasonLockWrapper>
            </GridItem>
          </>
        )}
        <GridItem
          colSpan={{ base: 12, xl: 6 }}
          rowSpan={1}
          order={{ base: 10, xl: 'unset' }}
        >
          <TopTeamPlayers amount={10} />
        </GridItem>
        {isActivePlayer && (
          <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
            <SeasonLockWrapper>
              <PlayerRecentGames />
            </SeasonLockWrapper>
          </GridItem>
        )}
        <TeamPresence />
      </Grid>
    </>
  )
}

export default AppPage
