import {
  DeleteInvitationTokenMutation,
  DeleteInvitationTokenMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

export const DELETE_INVITATION_TOKEN = gql`
  mutation DeleteInvitationTokenMutation($id: String!) {
    deleteInvitationToken(id: $id) {
      id
      name
      invitationToken
    }
  }
`

export const useDeleteInvitationToken = () => {
  const [deleteInvationToken, { loading, error }] = useMutation<
    DeleteInvitationTokenMutation,
    DeleteInvitationTokenMutationVariables
  >(DELETE_INVITATION_TOKEN, {
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleDeleteInvitationToken = async (teamId: string) => {
    const deleteInvitationResult = await deleteInvationToken({
      variables: { id: teamId },
    })

    if (!deleteInvitationResult.errors) {
      toast.success('Uitnodiging succesvol verwijderd 🗑️')
    }
  }

  return {
    handleDeleteInvitationToken,
    loading,
    error,
  }
}
