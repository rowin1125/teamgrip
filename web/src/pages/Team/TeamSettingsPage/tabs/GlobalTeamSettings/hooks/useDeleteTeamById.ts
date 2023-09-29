import { DeleteTeamById, DeleteTeamByIdVariables } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';

export const DELETE_TEAM_BY_ID = gql`
    mutation DeleteTeamById($id: String!) {
        deleteTeam(id: $id) {
            id
        }
    }
`;

export const useDeleteTeamById = () => {
    const { reauthenticate } = useAuth();
    const [deleteTeam, { loading: deleteTeamLoading }] = useMutation<
        DeleteTeamById,
        DeleteTeamByIdVariables
    >(DELETE_TEAM_BY_ID, {
        onCompleted: reauthenticate,
    });

    const handleDeleteTeamById = async (id: string) => {
        const deleteTeamById = await deleteTeam({
            variables: {
                id,
            },
        });
        if (!deleteTeamById.errors) {
            toast.success('Team succesvol verwijderd 🗑️');
            navigate(routes.app());
        }
    };

    return { handleDeleteTeamById, deleteTeamLoading };
};
