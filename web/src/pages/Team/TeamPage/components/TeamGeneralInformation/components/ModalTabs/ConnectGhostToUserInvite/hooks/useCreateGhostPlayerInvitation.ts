import {
  CreateGhostPlayerInvitationMutation,
  CreateGhostPlayerInvitationMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { PLAYER_FRAGMENT } from 'src/graphql/fragments/PlayerFragment'

export const CREATE_GHOST_PLAYER_INVITATION = gql`
  ${PLAYER_FRAGMENT}
  mutation CreateGhostPlayerInvitationMutation($id: String!) {
    createGhostPlayerInvitation(id: $id) {
      ...PlayerFragment
    }
  }
`

export const useCreateGhostPlayerInvitation = () => {
  const [createGhostPlayerInvitation, { loading, error }] = useMutation<
    CreateGhostPlayerInvitationMutation,
    CreateGhostPlayerInvitationMutationVariables
  >(CREATE_GHOST_PLAYER_INVITATION, {
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleCreateInvitation = async (id: string) => {
    const ghostPlayer = await createGhostPlayerInvitation({
      variables: { id },
    })

    if (!ghostPlayer.errors) {
      toast.success('Uitnodiging succesvol aangemaakt 🥳')
    }
  }

  return { handleCreateInvitation, loading, error }
}
