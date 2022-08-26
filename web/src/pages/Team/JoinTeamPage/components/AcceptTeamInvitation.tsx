import React, { useEffect } from 'react'

import { Button, Flex, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useParams } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'

import { useGetTeamByInvitationToken } from 'src/hooks/api/query/useGetTeamByInvitationToken'

import { useTeamInvitation } from '../hooks/useTeamInvitation'

const AcceptTeamInvitation = () => {
  const { currentUser } = useAuth()
  const { invitationToken } = useParams()
  const { team, loading: teamLoading } = useGetTeamByInvitationToken(
    invitationToken || ''
  )
  const { handleJoinTeam, loading, handleDeleteTeamInvitation } =
    useTeamInvitation()

  const playerHasInvitation = currentUser?.player?.teamInvitation

  useEffect(() => {
    if (!teamLoading && !team) {
      toast.error('Geen team gevonden op basis van de uitnodiging')
      navigate(routes.app())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamLoading])

  return (
    <>
      <Heading color="white">
        Invite voor {team?.name} bij {team?.club?.name} 📬️
      </Heading>
      <Text mt={8}>
        Je hebt een uitnodiging ontvangen om de {team?.name} bij{' '}
        {team?.club?.name} te joinen. Join en maak deel uit van dit fantastische
        team en ga de uitdaging aan.
      </Text>
      <Text mt={8} fontSize="sm" fontStyle="italic">
        Indien je geen idee hebt waarom je bent uitgenodigd kan je altijd
        weigeren
      </Text>
      <Flex mt={2} justifyContent="flex-end">
        {playerHasInvitation ? (
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => handleDeleteTeamInvitation(currentUser?.player?.id)}
          >
            Verwijder uitnodiging
          </Button>
        ) : (
          <Button onClick={() => navigate(routes.app())}>Annuleer</Button>
        )}
        <Button
          ml={4}
          colorScheme="secondary"
          isLoading={loading}
          onClick={() => handleJoinTeam(currentUser?.player?.id, team?.id)}
        >
          Join het team
        </Button>
      </Flex>
    </>
  )
}

export default AcceptTeamInvitation
