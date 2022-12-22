import {
  DeleteSeasonMutation,
  DeleteSeasonMutationVariables,
  Season,
} from 'types/graphql';

import { useAuth } from '@redwoodjs/auth';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { GET_SEASON_BY_TEAM_ID_QUERY } from './useGetSeasonsByTeamId';

export const DELETE_SEASON_MUTATION = gql`
  mutation DeleteSeasonMutation($id: String!) {
    deleteSeason(id: $id) {
      id
    }
  }
`;

export const useDeleteSeasonById = () => {
  const { currentUser } = useAuth();

  const [deleteSeason, { loading }] = useMutation<
    DeleteSeasonMutation,
    DeleteSeasonMutationVariables
  >(DELETE_SEASON_MUTATION, {
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [
      {
        query: GET_SEASON_BY_TEAM_ID_QUERY,
        variables: { teamId: currentUser?.player?.teamId },
      },
    ],
  });

  const handleDeleteSeason = async (id: Season['id']) => {
    const deletedSeason = await deleteSeason({ variables: { id } });

    if (!deletedSeason.errors) {
      toast.success('Seizoen succesvol verwijderd 🗑️');
    }
  };

  return { handleDeleteSeason, loading };
};
