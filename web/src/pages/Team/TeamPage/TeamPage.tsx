import { useState } from 'react'

import {
  Button,
  Grid,
  GridItem,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'

import { routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import TeamGeneralInformation from './components/TeamGeneralInformation'
import TeamList from './components/TeamList/TeamList'
import TeamNotFoundMessage from './components/TeamNotFoundMessage/TeamNotFoundMessage'
import TeamTrainings from './components/TeamTrainings/TeamTrainings'

const TeamPage = () => {
  const { isTeamStaff } = useTeamPlayerAuth()
  const { team, loading } = useGetTeamById()
  const disclosure = useDisclosure()
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const isPartOfTeam = !!team?.id

  if (!loading && !isPartOfTeam)
    return (
      <>
        <MetaTags title="Team" description="Team page" />
        <TeamNotFoundMessage />
      </>
    )

  return (
    <>
      <MetaTags title="Team" description="Team page" />

      <Grid templateColumns="repeat(4, 1fr)" templateRows="auto" gap={10}>
        <GridItem colSpan={{ base: 4, xl: 2 }} rowSpan={1}>
          <TeamGeneralInformation
            currentTabIndex={currentTabIndex}
            disclosure={disclosure}
            setCurrentTabIndex={setCurrentTabIndex}
            team={team}
          />
        </GridItem>
        <GridItem colSpan={{ base: 4, xl: 2 }} rowSpan={14}>
          <TeamList
            team={team}
            disclosure={disclosure}
            setCurrentTabIndex={setCurrentTabIndex}
          />
        </GridItem>
        {isTeamStaff && team?.season?.length < 1 && (
          <GridItem colSpan={{ base: 2, xl: 1 }} rowSpan={1}>
            <Card>
              <Heading>Seizoen</Heading>
              {!!team?.id && (
                <Button
                  as={RedwoodLink}
                  to={routes.newSeason({ id: team?.id })}
                  mt={4}
                >
                  Start je seizoen
                </Button>
              )}
            </Card>
          </GridItem>
        )}
        <GridItem colSpan={{ base: 4, xl: 2 }} rowSpan={1}>
          <TeamTrainings />
        </GridItem>
      </Grid>
    </>
  )
}

export default TeamPage
