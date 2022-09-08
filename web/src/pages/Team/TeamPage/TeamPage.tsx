import { useState } from 'react'

import { Grid, GridItem, useDisclosure } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import SeasonLockWrapper from '../../../components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper'

import TeamGeneralInformation from './components/TeamGeneralInformation'
import TeamList from './components/TeamList/TeamList'
import TeamNotFoundMessage from './components/TeamNotFoundMessage/TeamNotFoundMessage'
import TeamTrainings from './components/TeamTrainings/TeamTrainings'

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
        <GridItem colSpan={{ base: 4, xl: 2 }} rowSpan={1}>
          <SeasonLockWrapper>
            <TeamTrainings />
          </SeasonLockWrapper>
        </GridItem>
      </Grid>
    </>
  )
}

export default TeamPage
