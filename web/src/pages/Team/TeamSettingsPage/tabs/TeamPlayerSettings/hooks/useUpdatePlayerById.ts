import {
  PlayerType,
  UpdatePlayerByIdMutation,
  UpdatePlayerByIdMutationVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { GET_TEAM_PLAYERS_FOR_SETTINGS } from './useGetTeamPlayersForSettings';

type UseUpdatePlayerByIdType = {
  onClose: () => void;
};

type FormValuesType = {
  id: string;
  playerType: PlayerType;
};

export const UPDATE_PLAYER_BY_ID_MUTATION = gql`
  mutation UpdatePlayerByIdMutation($id: String!, $input: UpdatePlayerInput!) {
    updatePlayer(id: $id, input: $input) {
      id
    }
  }
`;

export const useUpdatePlayerById = ({ onClose }: UseUpdatePlayerByIdType) => {
  const { currentUser } = useAuth();
  const [updatePlayer, { loading, error }] = useMutation<
    UpdatePlayerByIdMutation,
    UpdatePlayerByIdMutationVariables
  >(UPDATE_PLAYER_BY_ID_MUTATION, {
    refetchQueries: [
      {
        query: GET_TEAM_PLAYERS_FOR_SETTINGS,
        variables: {
          id: currentUser?.player.teamId,
        },
      },
    ],
  });

  const handleUpdatePlayer = async (values: FormValuesType) => {
    try {
      await updatePlayer({
        variables: {
          id: values.id,
          input: {
            playerType: values.playerType,
          },
        },
      });
      toast.success('Speler succesvol aangepast');
      onClose();
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  return {
    handleUpdatePlayer,
    handleUpdatePlayerLoading: loading,
    handleUpdatePlayerError: error,
  };
};
