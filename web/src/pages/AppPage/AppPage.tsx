import { Grid } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import PlayerDashboard from './components/PlayerDashboard'
import StaffDashboard from './components/StaffDashboard'

const AppPage = () => {
  const { isTeamStaff, isTeamPlayer } = useTeamPlayerAuth()
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
        {isTeamPlayer && <PlayerDashboard />}
        {isTeamStaff && <StaffDashboard />}
      </Grid>
    </>
  )
}

export default AppPage
