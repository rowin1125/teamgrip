import {
  CreateGhostPlayerInvitationMutation,
  CreateGhostPlayerInvitationMutationVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { PLAYER_FRAGMENT } from 'src/graphql/fragments/PlayerFragment';
import { GET_PLAYERS_AND_SCORES_BY_TEAM_ID } from 'src/pages/Team/TeamPage/hooks/useGetPlayersAndScoresByTeamId';

export const CREATE_GHOST_PLAYER_INVITATION = gql`
  ${PLAYER_FRAGMENT}
  mutation CreateGhostPlayerInvitationMutation($id: String!) {
    createGhostPlayerInvitation(id: $id) {
      ...PlayerFragment
    }
  }
`;

export const useCreateGhostPlayerInvitation = () => {
  const { currentUser } = useAuth();
  const [createGhostPlayerInvitation, { loading, error }] = useMutation<
    CreateGhostPlayerInvitationMutation,
    CreateGhostPlayerInvitationMutationVariables
  >(CREATE_GHOST_PLAYER_INVITATION, {
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

  const handleCreateInvitation = async (id: string) => {
    const ghostPlayer = await createGhostPlayerInvitation({
      variables: { id },
    });

    if (!ghostPlayer.errors) {
      toast.success('Uitnodiging succesvol aangemaakt 🥳');
    }
  };

  return { handleCreateInvitation, loading, error };
};
