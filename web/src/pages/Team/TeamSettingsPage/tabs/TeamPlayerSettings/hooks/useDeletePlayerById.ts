import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { GET_TEAM_PLAYERS_FOR_SETTINGS } from './useGetTeamPlayersForSettings'

export const DELETE_PLAYER_BY_ID_MUTATION = gql`
  mutation DeletePlayerByIdMutation($id: String!) {
    deletePlayer(id: $id) {
      id
    }
  }
`

export const useDeletePlayerById = () => {
  const { currentUser } = useAuth()
  const [deletePlayer, { loading }] = useMutation(
    DELETE_PLAYER_BY_ID_MUTATION,
    {
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        {
          query: GET_TEAM_PLAYERS_FOR_SETTINGS,
          variables: { id: currentUser?.player?.teamId },
        },
      ],
    }
  )

  const handleDeletePlayerById = async (id: string) => {
    const deletePlayerById = await deletePlayer({
      variables: {
        id,
      },
    })

    if (!deletePlayerById.errors) {
      toast.success('Speler succesvol verwijderd 🗑️')
    }
  }

  return {
    handleDeletePlayerById,
    handleDeletePlayerByIdLoading: loading,
  }
}
