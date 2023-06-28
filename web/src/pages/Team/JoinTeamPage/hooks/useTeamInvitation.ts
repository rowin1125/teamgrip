import {
  PlayerJoinsTeamByGhostInvitation,
  PlayerJoinsTeamByGhostInvitationVariables,
  PlayerRejoinsTeamFromHistory,
  PlayerRejoinsTeamFromHistoryVariables,
  UpdatePlayerMutation,
  UpdatePlayerMutationVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { PLAYER_FRAGMENT } from 'src/graphql/fragments/PlayerFragment';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';

const UPDATE_PLAYER_MUTATION = gql`
  ${PLAYER_FRAGMENT}
  mutation UpdatePlayerMutation($id: String!, $input: UpdatePlayerInput!) {
    updatePlayer(id: $id, input: $input) {
      ...PlayerFragment
    }
  }
`;

const PLAYER_JOINS_TEAM_BY_GHOST_INVITATION = gql`
  ${PLAYER_FRAGMENT}
  mutation PlayerJoinsTeamByGhostInvitation(
    $id: String!
    $ghostId: String!
    $teamId: String!
  ) {
    playerJoinsTeamByGhostInvitation(
      id: $id
      ghostId: $ghostId
      teamId: $teamId
    ) {
      ...PlayerFragment
    }
  }
`;

const PLAYER_REJOINS_TEAM_FROM_HISTORY = gql`
  ${PLAYER_FRAGMENT}
  mutation PlayerRejoinsTeamFromHistory($id: String!, $teamId: String!) {
    rejoinTeamFromHistory(id: $id, teamId: $teamId) {
      ...PlayerFragment
    }
  }
`;

export const useTeamInvitation = () => {
  const { reauthenticate, currentUser } = useAuth();
  const { team } = useGetTeamById();

  const [updatePlayer, { loading }] = useMutation<
    UpdatePlayerMutation,
    UpdatePlayerMutationVariables
  >(UPDATE_PLAYER_MUTATION, {
    onCompleted: reauthenticate,
  });

  const [playerRejoinsTeamFromHistory, { loading: rejoinLoading }] =
    useMutation<
      PlayerRejoinsTeamFromHistory,
      PlayerRejoinsTeamFromHistoryVariables
    >(PLAYER_REJOINS_TEAM_FROM_HISTORY, {
      onCompleted: reauthenticate,
    });

  const handleJoinTeam = async (playerId: string, teamId: string) => {
    const isPartOfTeam = !!team;
    const isOwner = team?.owner?.id === currentUser?.id;
    if (isOwner) {
      toast.error(
        'Je bent eigenaar van een team, verwijder eerst dit team en open vervolgens opnieuw de link',
        {
          duration: 10000,
        }
      );
      navigate(routes.teamSettings());
      return;
    }
    if (isPartOfTeam) {
      toast.error(
        'Je bent al onderdeel van een team, verlaat eerst je huidige team'
      );
      return;
    }
    try {
      await playerRejoinsTeamFromHistory({
        variables: {
          id: playerId,
          teamId,
        },
      });

      toast.success('Gefeliciteerd, je bent onderdeel van het team');
      navigate(routes.team());
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteTeamInvitation = async (playerId: string) => {
    try {
      await updatePlayer({
        variables: {
          id: playerId,
          input: {
            teamInvitation: null,
          },
        },
      });
      toast.success('De uitnodiging is verwijderd 🗑️');
      navigate(routes.app());
    } catch (error) {
      console.error(error);
      toast.error('Oeps er is iets fout gegaan 😢');
    }
  };

  const [playerJoinsTeamByGhostInvitation, { loading: isGhostJoiningLoading }] =
    useMutation<
      PlayerJoinsTeamByGhostInvitation,
      PlayerJoinsTeamByGhostInvitationVariables
    >(PLAYER_JOINS_TEAM_BY_GHOST_INVITATION, {
      onCompleted: reauthenticate,
    });

  const handleJoinTeamAsGhost = async (
    playerId: string,
    ghostId: string,
    teamId: string
  ) => {
    try {
      await playerJoinsTeamByGhostInvitation({
        variables: {
          id: playerId,
          ghostId,
          teamId,
        },
      });
      toast.success('Gefeliciteerd, je bent onderdeel van het team');
      navigate(routes.team());
    } catch (error) {
      console.error(error);
      toast.error('Oeps er is iets fout gegaan 😢');
    }
  };

  return {
    handleJoinTeamAsGhost,
    handleJoinTeam,
    handleDeleteTeamInvitation,
    loading: loading || isGhostJoiningLoading,
  };
};
