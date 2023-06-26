/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateGhostPlayersInput,
  InviteGhostsPlayersMutation,
  InviteGhostsPlayersMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { GET_PLAYERS_AND_SCORES_BY_TEAM_ID } from 'src/pages/Team/TeamPage/hooks/useGetPlayersAndScoresByTeamId';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

export const INVITE_GHOSTS_PLAYERS = gql`
  mutation InviteGhostsPlayersMutation($input: CreateGhostPlayersInput!) {
    createManyGhostPlayers(input: $input) {
      count
    }
  }
`;

export const useInviteGhosts = () => {
  const { currentUser } = useTeamPlayerAuth();

  const [inviteGhostPlayers, { loading, error }] = useMutation<
    InviteGhostsPlayersMutation,
    InviteGhostsPlayersMutationVariables
  >(INVITE_GHOSTS_PLAYERS, {
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [
      {
        query: GET_PLAYERS_AND_SCORES_BY_TEAM_ID,
        variables: { teamId: currentUser?.player?.teamId, limit: 50 },
      },
    ],
  });

  const handleInviteGhostsPlayers = async (input: CreateGhostPlayersInput) => {
    const ghostPlayers = await inviteGhostPlayers({
      variables: {
        input,
      },
    });
    if (!ghostPlayers.errors) {
      toast.success(
        `${ghostPlayers.data?.createManyGhostPlayers?.count} ghostspelers succesvol aangemaakt 👻`
      );
    }
    return ghostPlayers.data?.createManyGhostPlayers?.count;
  };

  return {
    handleInviteGhostsPlayers,
    loading,
    error,
  };
};
