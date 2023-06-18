import { DeleteGameById, DeleteGameByIdVariables, Game } from 'types/graphql';

import { useAuth } from 'src/auth';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { GET_PLAYERS_AND_SCORES_BY_TEAM_ID } from '../../../hooks/useGetPlayersAndScoresByTeamId';

import { GET_GAMES_BY_TEAM_QUERY } from './useGetGamesByTeamId';

export const DELETE_GAME_BY_ID = gql`
  mutation DeleteGameById($id: String!) {
    deleteGame(id: $id) {
      id
    }
  }
`;

export const useDeleteGameById = () => {
  const { currentUser } = useAuth();

  const [deleteGame, { loading, error }] = useMutation<
    DeleteGameById,
    DeleteGameByIdVariables
  >(DELETE_GAME_BY_ID, {
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [
      {
        query: GET_PLAYERS_AND_SCORES_BY_TEAM_ID,
        variables: { teamId: currentUser?.player?.teamId },
      },
      {
        query: GET_GAMES_BY_TEAM_QUERY,
        variables: { id: currentUser?.player?.teamId },
      },
    ],
  });

  const handleDeleteGameById = async (id: Game['id']) => {
    const deleteGameById = await deleteGame({
      variables: {
        id,
      },
    });

    if (!deleteGameById.errors) {
      toast.success('Wedstrijd succesvol verwijderd 🗑️');
    }
  };
  return {
    handleDeleteGameById,
    loading,
    error,
  };
};
