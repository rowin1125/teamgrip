import { Grid, GridItem, Heading } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import PlayerCard from 'src/components/PlayerCard/PlayerCard'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import PlayerRecentGames from './components/PlayerRecentGames'
import PlayerRecentTrainings from './components/PlayerRecentTrainings'
import TopTeamPlayers from './components/TopTeamPlayers'

const AppPage = () => {
  const { team } = useGetTeamById()

  return (
    <>
      <MetaTags title="App" description="App page" />

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
        <GridItem
          colSpan={{ base: 12, xl: 5 }}
          rowSpan={1}
          justifySelf="center"
        >
          <PlayerCard />
        </GridItem>
        <GridItem colSpan={{ base: 12, xl: 7 }} rowSpan={1}>
          <PlayerRecentTrainings />
        </GridItem>
        <GridItem
          colSpan={{ base: 12, xl: 5 }}
          rowSpan={1}
          order={{ base: 10, xl: 'unset' }}
        >
          <TopTeamPlayers amount={10} />
        </GridItem>
        <GridItem colSpan={{ base: 12, xl: 7 }} rowSpan={1}>
          <PlayerRecentGames />
        </GridItem>
      </Grid>
    </>
  )
}

export default AppPage
