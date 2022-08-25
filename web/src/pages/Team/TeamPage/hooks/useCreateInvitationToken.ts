import {
  CreateInvitationTokenMutation,
  CreateInvitationTokenMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

export const CREATE_INVITATION_TOKEN = gql`
  mutation CreateInvitationTokenMutation($id: String!) {
    createInvitationToken(id: $id) {
      id
      name
      invitationToken
    }
  }
`

export const useCreateInvitationToken = (teamId) => {
  const [createInvitationToken, { loading, error }] = useMutation<
    CreateInvitationTokenMutation,
    CreateInvitationTokenMutationVariables
  >(CREATE_INVITATION_TOKEN, {
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleCreateInvitation = async () => {
    const invitationResult = await createInvitationToken({
      variables: { id: teamId },
    })

    if (!invitationResult.errors) {
      toast.success('Uitnodiging succesvol aangemaakt 🥳')
    }
  }

  return { handleCreateInvitation, loading, error }
}
