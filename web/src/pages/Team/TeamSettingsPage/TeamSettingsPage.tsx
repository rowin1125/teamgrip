import { useEffect } from 'react'

import {
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Card from 'src/components/Card/Card'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import TeamNotFoundMessage from '../TeamPage/components/TeamNotFoundMessage'

import GlobalTeamSettings from './tabs/GlobalTeamSettings/GlobalTeamSettings'

const TeamSettingsPage = () => {
  const { team, loading } = useGetTeamById()
  const { isTeamStaff } = useTeamPlayerAuth()
  const isPartOfTeam = !!team?.id

  useEffect(() => {
    if (!isPartOfTeam) return
    if (!isTeamStaff) {
      navigate(routes.app())
      toast.error('Je hebt geen toegang tot deze pagina')
    }
  }, [isTeamStaff, isPartOfTeam])

  if (!loading && !isPartOfTeam)
    return (
      <>
        <MetaTags
          title="Team settings"
          description="Bekijk en beheer je team instellingen"
        />
        <TeamNotFoundMessage />
      </>
    )

  return (
    <>
      <MetaTags
        title="Team settings"
        description="Bekijk en beheer je team instellingen"
      />
      <Grid templateColumns="repeat(4, 1fr)" templateRows="auto" gap={10}>
        <GridItem colSpan={{ base: 4, xl: 2 }} rowSpan={1}>
          <Card>
            <Heading as="h1" size="2xl">
              Teamsettings
            </Heading>
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 4, xl: 4 }} rowSpan={1}>
          <Card>
            <Tabs>
              <TabList>
                <Tab>
                  <Text fontWeight="bold">Globale instellingen</Text>
                </Tab>
                <Tab>
                  <Text fontWeight="bold">Spelers beheren</Text>
                </Tab>
                <Tab>
                  <Text fontWeight="bold">Seizoenen beheren</Text>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <GlobalTeamSettings />
                </TabPanel>
                <TabPanel>
                  <Heading as="h2" size="lg" mt={8}>
                    Beheer jouw spelers
                  </Heading>
                </TabPanel>
                <TabPanel>
                  <Heading as="h2" size="lg" mt={8}>
                    Beheer jouw seizoenen
                  </Heading>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default TeamSettingsPage
