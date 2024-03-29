import {
    GetClubsQuery,
    UpdateTeamById,
    UpdateTeamByIdVariables,
    UpdateTeamInput,
} from 'types/graphql';

import { gHistory } from '@redwoodjs/router/dist/history';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { TEAM_FRAGMENT } from 'src/graphql/fragments/TeamFragment';

export const UPDATE_TEAM_BY_ID = gql`
    ${TEAM_FRAGMENT}
    mutation UpdateTeamById($id: String!, $input: UpdateTeamInput!) {
        updateTeam(id: $id, input: $input) {
            ...TeamFragment
        }
    }
`;

export const useUpdateTeam = (clubs?: GetClubsQuery['clubs']) => {
    const { reauthenticate, currentUser } = useAuth();
    const [updateTeam, { loading: updateTeamLoading }] = useMutation<
        UpdateTeamById,
        UpdateTeamByIdVariables
    >(UPDATE_TEAM_BY_ID, {
        onCompleted: reauthenticate,
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleUpdateTeam = async (input: UpdateTeamInput) => {
        const clubName = clubs
            ?.find((club) => club.id === input.clubId)
            ?.name?.toLowerCase();
        const teamNameContainsClubName = input.name
            .toLowerCase()
            .includes(clubName || '');
        if (teamNameContainsClubName) {
            toast.error('Clubnaam mag niet in teamnaam zitten');
            return;
        }

        const updateTeamById = await updateTeam({
            variables: {
                id: currentUser?.player?.teamId || '',
                input: {
                    ...input,
                    clubTeamName: `${clubName}-${input.name}`,
                },
            },
        });

        if (!updateTeamById.errors) {
            toast.success('Team succesvol aangepast 🎉');
            gHistory.back();
        }
    };

    return { handleUpdateTeam, updateTeamLoading };
};
