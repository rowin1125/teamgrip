import React from 'react'

import { Flex, Heading, Button, Box } from '@chakra-ui/react'
import { format } from 'date-fns'

import { routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'
import TeamTable from 'src/components/TeamTable'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import { useDeleteTrainingById } from './hooks/useDeleteTrainingById'
import { useGetTrainingsByTeam } from './hooks/useGetTrainingsByTeam'

const TeamTrainings = () => {
  const { trainings } = useGetTrainingsByTeam()
  const { handleDeleteTrainingById } = useDeleteTrainingById()
  const { isTeamStaff } = useTeamPlayerAuth()

  const trainingEntries = trainings?.map((training) => {
    const bestPlayerOfTraining = training?.scores?.slice()?.sort((a, b) => {
      if (a.points < b.points) return -1
      if (a.points > b.points) return 1
      return 0
    })?.[0]

    return {
      id: training.id,
      datum: format(new Date(training.trainingsDate), 'dd-MM-yyyy'),
      deelnemers: training.scores.length,
      'Top speler': bestPlayerOfTraining?.player?.displayName,
      season: training.season.name,
    }
  })

  return (
    <Card>
      <Flex justifyContent="space-between">
        <Heading>Recente trainingen</Heading>
        {isTeamStaff && (
          <Button
            colorScheme="secondary"
            as={RedwoodLink}
            to={routes.newTraining()}
          >
            Registreer training
          </Button>
        )}
      </Flex>
      <Box mt={8} overflowX="auto">
        <TeamTable
          theme="light"
          size="md"
          entries={trainingEntries}
          hiddenColumns={['id']}
          routes={{
            detail: routes.trainingDetail,
            update: routes.updateTraining,
          }}
          onDelete={handleDeleteTrainingById}
          showActions
        />
      </Box>
    </Card>
  )
}

export default TeamTrainings
