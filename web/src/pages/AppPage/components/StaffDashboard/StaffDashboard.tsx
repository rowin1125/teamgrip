import React from 'react'

import { GridItem, Heading } from '@chakra-ui/react'

import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import TeamPresence from '../TeamPresence'
import TopTeamPlayers from '../TopTeamPlayers'

const StaffDashboard = () => {
  const { team } = useGetTeamById()

  return (
    <>
      <GridItem colSpan={{ base: 12 }} rowSpan={2}>
        <Heading as="h1" size="2xl" color="white">
          Jouw team dashboard
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
        order={{ base: 10, xl: 'unset' }}
      >
        <TopTeamPlayers amount={10} />
      </GridItem>
      <TeamPresence />
    </>
  )
}

export default StaffDashboard
