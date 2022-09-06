import {
  DeleteTrainingById,
  DeleteTrainingByIdVariables,
  Training,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { GET_PLAYERS_AND_SCORES_BY_TEAM_ID } from '../../../hooks/useGetPlayersAndScoresByTeamId'

import { GET_TRAININGS_BY_TEAM_QUERY } from './useGetTrainingsByTeam'

export const DELETE_TRAINING_BY_ID = gql`
  mutation DeleteTrainingById($id: String!) {
    deleteTraining(id: $id) {
      id
    }
  }
`

export const useDeleteTrainingById = () => {
  const [deleteTraining, { loading, error }] = useMutation<
    DeleteTrainingById,
    DeleteTrainingByIdVariables
  >(DELETE_TRAINING_BY_ID, {
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      GET_PLAYERS_AND_SCORES_BY_TEAM_ID,
      GET_TRAININGS_BY_TEAM_QUERY,
    ],
  })

  const handleDeleteTrainingById = async (id: Training['id']) => {
    const deleteTrainingById = await deleteTraining({
      variables: {
        id,
      },
    })

    if (!deleteTrainingById.errors) {
      toast.success('Training succesvol verwijderd 🗑️')
    }
  }
  return {
    handleDeleteTrainingById,
    loading,
    error,
  }
}
