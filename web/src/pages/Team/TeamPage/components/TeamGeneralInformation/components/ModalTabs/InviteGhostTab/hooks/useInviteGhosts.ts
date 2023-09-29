/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CreateGhostPlayersInput,
    InviteGhostsPlayersMutation,
    InviteGhostsPlayersMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';
import { GET_PLAYERS_AND_SCORES_BY_TEAM_ID } from 'src/pages/Team/TeamPage/hooks/useGetPlayersAndScoresByTeamId';

import { GET_GHOST_PLAYERS_FOR_BY_TEAM_ID } from '../../ConnectGhostToUserInvite/hooks/useGetGhostsPlayersForTeam';

export const INVITE_GHOSTS_PLAYERS = gql`
    mutation InviteGhostsPlayersMutation($input: CreateGhostPlayersInput!) {
        createManyGhostPlayers(input: $input) {
            count
        }
    }
`;

export const useInviteGhosts = () => {
    const { currentUser } = useTeamPlayerAuth();

    const [inviteGhostPlayers, { loading, error }] = useMutation<
        InviteGhostsPlayersMutation,
        InviteGhostsPlayersMutationVariables
    >(INVITE_GHOSTS_PLAYERS, {
        onCompleted: (data) => {
            if (data.createManyGhostPlayers?.count) {
                toast.success(
                    `${data.createManyGhostPlayers.count} ghostspelers succesvol aangemaakt 👻`
                );
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
        refetchQueries: [
            {
                query: GET_PLAYERS_AND_SCORES_BY_TEAM_ID,
                variables: { teamId: currentUser?.player?.teamId, limit: 50 },
            },
            {
                query: GET_GHOST_PLAYERS_FOR_BY_TEAM_ID,
                variables: { teamId: currentUser?.player?.teamId },
            },
        ],
    });

    const handleInviteGhostsPlayers = async (
        input: CreateGhostPlayersInput
    ) => {
        await inviteGhostPlayers({
            variables: {
                input,
            },
        });
    };

    return {
        handleInviteGhostsPlayers,
        loading,
        error,
    };
};
