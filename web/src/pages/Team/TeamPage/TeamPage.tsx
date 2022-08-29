import { useState } from 'react'

import {
  Button,
  Grid,
  GridItem,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import Card from 'src/components/Card/Card'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import TeamGeneralInformation from './components/TeamGeneralInformation'
import TeamList from './components/TeamList/TeamList'
import TeamNotFoundMessage from './components/TeamNotFoundMessage/TeamNotFoundMessage'

const TeamPage = () => {
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

      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={10}
      >
        <GridItem colSpan={{ base: 2, xl: 1 }} rowSpan={1}>
          <TeamGeneralInformation
            currentTabIndex={currentTabIndex}
            disclosure={disclosure}
            setCurrentTabIndex={setCurrentTabIndex}
            team={team}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, xl: 1 }} rowSpan={4}>
          <TeamList
            team={team}
            disclosure={disclosure}
            setCurrentTabIndex={setCurrentTabIndex}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, xl: 1 }} rowSpan={1}>
          <Card>
            <Heading>Seizoen</Heading>
            <Button mt={4}>Start je seizoen</Button>
          </Card>
        </GridItem>
      </Grid>
    </>
  )
}

export default TeamPage
