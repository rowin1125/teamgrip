import React from 'react';

import { Flex, Button } from '@chakra-ui/react';
import {
  FindTeamByInvitationTokenQuery,
  GetPlayerByGhostInvitationQuery,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { navigate, routes } from '@redwoodjs/router';

import { useTeamInvitation } from '../../../hooks/useTeamInvitation';

type AcceptButtonsProps = {
  team: FindTeamByInvitationTokenQuery['teamByInvitationToken'];
  ghostPlayer: GetPlayerByGhostInvitationQuery['getGhostPlayerByInvitation'];
};

const AcceptButtons = ({ ghostPlayer, team }: AcceptButtonsProps) => {
  const { currentUser } = useAuth();

  const {
    handleJoinTeam,
    loading,
    handleDeleteTeamInvitation,
    handleJoinTeamAsGhost,
  } = useTeamInvitation();

  const hasGhostPlayer = !!ghostPlayer?.id;
  const playerHasInvitation = currentUser?.player?.teamInvitation;

  return (
    <Flex
      mt={2}
      justifyContent="flex-end"
      direction={{ base: 'column', xl: 'row' }}
    >
      {playerHasInvitation ? (
        <Button
          variant="outline"
          colorScheme="red"
          mb={{ base: 4, xl: 0 }}
          onClick={() =>
            handleDeleteTeamInvitation(currentUser?.player?.id || '')
          }
        >
          Verwijder uitnodiging
        </Button>
      ) : (
        <Button mb={{ base: 4, xl: 0 }} onClick={() => navigate(routes.app())}>
          Annuleer
        </Button>
      )}
      <Button
        mb={{ base: 4, xl: 0 }}
        ml={{ base: 0, xl: 4 }}
        colorScheme={hasGhostPlayer ? 'red' : 'secondary'}
        isLoading={loading}
        onClick={() =>
          handleJoinTeam(currentUser?.player?.id || '', team?.id || '')
        }
      >
        {hasGhostPlayer ? 'Join zonder gegevens ⚠️' : 'Join'}
      </Button>

      {hasGhostPlayer && (
        <Button
          ml={{ base: 0, xl: 4 }}
          colorScheme="green"
          isLoading={loading}
          onClick={() =>
            handleJoinTeamAsGhost(
              currentUser?.player?.id || '',
              ghostPlayer.id,
              team?.id || ''
            )
          }
        >
          {hasGhostPlayer
            ? `Join als ${ghostPlayer.displayName} 🥳`
            : 'Join het team'}
        </Button>
      )}
    </Flex>
  );
};

export default AcceptButtons;
