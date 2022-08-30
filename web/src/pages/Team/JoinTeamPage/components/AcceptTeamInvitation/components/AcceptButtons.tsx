import React from 'react'

import { Flex, Button } from '@chakra-ui/react'
import {
  FindTeamByInvitationTokenQuery,
  GetPlayerByGhostInvitationQuery,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

import { useTeamInvitation } from '../../../hooks/useTeamInvitation'

type AcceptButtonsProps = {
  team: FindTeamByInvitationTokenQuery['teamByInvitationToken']
  ghostPlayer: GetPlayerByGhostInvitationQuery['getGhostPlayerByInvitation']
}

const AcceptButtons = ({ ghostPlayer, team }: AcceptButtonsProps) => {
  const { currentUser } = useAuth()

  const {
    handleJoinTeam,
    loading,
    handleDeleteTeamInvitation,
    handleJoinTeamAsGhost,
  } = useTeamInvitation()

  const hasGhostPlayer = !!ghostPlayer?.id
  const playerHasInvitation = currentUser?.player?.teamInvitation

  return (
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
        colorScheme={hasGhostPlayer ? 'orange' : 'primary'}
        isLoading={loading}
        onClick={() => handleJoinTeam(currentUser?.player?.id, team?.id)}
      >
        Join het team normaal
      </Button>

      {hasGhostPlayer && (
        <Button
          ml={4}
          colorScheme="secondary"
          isLoading={loading}
          onClick={() =>
            handleJoinTeamAsGhost(
              currentUser?.player?.id,
              ghostPlayer.id,
              team?.id
            )
          }
        >
          {hasGhostPlayer
            ? `Join als ${ghostPlayer.displayName}`
            : 'Join het team'}
        </Button>
      )}
    </Flex>
  )
}

export default AcceptButtons
