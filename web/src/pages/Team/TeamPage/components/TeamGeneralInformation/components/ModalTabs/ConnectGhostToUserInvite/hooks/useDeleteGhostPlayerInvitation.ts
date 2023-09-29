import {
    DeleteGhostPlayerInvitationMutation,
    DeleteGhostPlayerInvitationMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { PLAYER_FRAGMENT } from 'src/graphql/fragments/PlayerFragment';

export const DELETE_GHOST_PLAYER_INVITATION = gql`
    ${PLAYER_FRAGMENT}
    mutation DeleteGhostPlayerInvitationMutation($id: String!) {
        deleteGhostPlayerInvitation(id: $id) {
            ...PlayerFragment
        }
    }
`;

export const useDeleteGhostPlayerInvitation = () => {
    const [deleteGhostPlayerInvitation, { loading, error }] = useMutation<
        DeleteGhostPlayerInvitationMutation,
        DeleteGhostPlayerInvitationMutationVariables
    >(DELETE_GHOST_PLAYER_INVITATION, {
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteGhostPlayerInvitation = async (id: string) => {
        const ghostPlayer = await deleteGhostPlayerInvitation({
            variables: { id },
        });

        if (!ghostPlayer.errors) {
            toast.success('Uitnodiging succesvol verwijderd 🗑️');
        }
    };

    return { handleDeleteGhostPlayerInvitation, loading, error };
};
