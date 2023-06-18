import {
  DeleteTrainingById,
  DeleteTrainingByIdVariables,
  Training,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { GET_PLAYERS_AND_SCORES_BY_TEAM_ID } from '../../../hooks/useGetPlayersAndScoresByTeamId';

import { GET_TRAININGS_BY_TEAM_QUERY } from './useGetTrainingsByTeam';

export const DELETE_TRAINING_BY_ID = gql`
  mutation DeleteTrainingById($id: String!) {
    deleteTraining(id: $id) {
      id
    }
  }
`;

export const useDeleteTrainingById = () => {
  const { currentUser } = useAuth();
  const [deleteTraining, { loading, error }] = useMutation<
    DeleteTrainingById,
    DeleteTrainingByIdVariables
  >(DELETE_TRAINING_BY_ID, {
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [
      {
        query: GET_PLAYERS_AND_SCORES_BY_TEAM_ID,
        variables: { teamId: currentUser?.player?.teamId || '' },
      },
      {
        query: GET_TRAININGS_BY_TEAM_QUERY,
        variables: {
          id: currentUser?.player?.teamId || '',
          limit: 10,
          page: 1,
        },
      },
    ],
  });

  const handleDeleteTrainingById = async (id: Training['id']) => {
    const deleteTrainingById = await deleteTraining({
      variables: {
        id,
      },
    });

    if (!deleteTrainingById.errors) {
      toast.success('Training succesvol verwijderd 🗑️');
    }
  };
  return {
    handleDeleteTrainingById,
    loading,
    error,
  };
};
