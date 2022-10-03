import React from 'react'

import { Box, Button, Heading, Text } from '@chakra-ui/react'

import { routes } from '@redwoodjs/router'

import DataDisplay from 'src/components/DataDisplay/DataDisplay'
import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog'
import RedwoodLink from 'src/components/RedwoodLink'
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById'

import { useDeleteTeamById } from './hooks/useDeleteTeamById'

const GlobalTeamSettings = () => {
  const { deleteTeamLoading, handleDeleteTeamById } = useDeleteTeamById()
  const { team } = useGetTeamById()
  if (!team) return null

  const staffAmount = team.players.filter(
    (player) => player?.playerType === 'STAFF'
  )?.length
  const playerAmount = team.players.filter(
    (player) => player?.playerType === 'PLAYER'
  )?.length

  return (
    <>
      <Heading as="h2" size="lg" mt={8}>
        Jouw globale teaminstellingen
      </Heading>
      <Box my={8} w={{ base: '100%', xl: '500px' }}>
        <Heading as="h3" size="md">
          Team gegevens{' '}
        </Heading>

        <DataDisplay
          wrapperProps={{ mt: 4 }}
          entry={{
            naam: team?.name,
            club: team?.club?.name,
            Eigenaar: `${team.owner?.userProfile?.firstname} ${team.owner?.userProfile?.lastname}`,
            'Aantal stafleden': staffAmount,
            'Aantal spelers': playerAmount,
            'Open uitnodiging': team?.invitationToken ? 'Ja' : 'Nee',
            'Aantal seizoenen': team?.season.length,
          }}
        />

        <Button
          colorScheme="secondary"
          mt={4}
          as={RedwoodLink}
          to={routes.updateTeam({ id: team.id })}
        >
          Wijzig team gegevens
        </Button>
      </Box>

      <Box
        borderColor="red.500"
        borderWidth="2px"
        borderRadius="lg"
        p={4}
        w={{ base: 'full', xl: '50%' }}
      >
        <Heading as="h3" size="md" color="red.500">
          Danger-zone
        </Heading>
        <Text mt={4}>
          Verwijder het team permanent. Dit kan niet ongedaan worden en betekend
          dat alle data permanent verloren gaat. Daarnaast komt de teamnaam vrij
          voor andere teams om te gebruiken en worden alle spelers losgekoppeld
          van het team.
        </Text>
        <DeleteDialog
          onDelete={handleDeleteTeamById}
          title="Verwijder team"
          buttonLabel="Verwijder team"
          buttonProps={{ ml: 0, mt: 4 }}
          id={team.id}
          loading={deleteTeamLoading}
        >
          <Text>
            Weet je zeker dat je het team wilt verwijderen? Dit kan niet
            ongedaan worden.
          </Text>
        </DeleteDialog>
      </Box>
    </>
  )
}

export default GlobalTeamSettings
