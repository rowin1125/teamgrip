import React from 'react'

import { Flex, Heading, Button, Box } from '@chakra-ui/react'
import { format } from 'date-fns'

import { routes } from '@redwoodjs/router'

import Card from 'src/components/Card/Card'
import RedwoodLink from 'src/components/RedwoodLink'
import TeamTable from 'src/components/TeamTable'

import { useDeleteTrainingById } from './hooks/useDeleteTrainingById'
import { useGetTrainingsByTeam } from './hooks/useGetTrainingsByTeam'

const TeamTrainings = () => {
  const { trainings } = useGetTrainingsByTeam()
  const { handleDeleteTrainingById } = useDeleteTrainingById()

  const trainingEntries = trainings?.map((training) => {
    const bestPlayerOfTraining = training?.scores?.slice()?.sort((a, b) => {
      if (a.points < b.points) return -1
      if (a.points > b.points) return 1
      return 0
    })?.[0]

    return {
      id: training.id,
      datum: format(new Date(training.trainingsDate), 'dd-MM-yyyy'),
      deelnemers: training.players.length,
      'Top speler': bestPlayerOfTraining?.player?.displayName,
      season: training.season.name,
    }
  })

  return (
    <Card>
      <Flex justifyContent="space-between">
        <Heading>Recente trainingen</Heading>
        <Button
          colorScheme="secondary"
          as={RedwoodLink}
          to={routes.newTraining()}
        >
          Registreer training
        </Button>
      </Flex>
      <Box mt={8} overflowX="auto">
        <TeamTable
          theme="light"
          size="md"
          entries={trainingEntries}
          hiddenColumns={['id']}
          routes={{
            detail: routes.trainingDetail,
            update: routes.trainingUpdate,
          }}
          onDelete={handleDeleteTrainingById}
          showActions
        />
      </Box>
    </Card>
  )
}

export default TeamTrainings
