/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import {
    UpdateGameByIdMutation,
    UpdateGameByIdMutationVariables,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { GAME_FRAGMENT } from 'src/graphql/fragments/GameFragment';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';
import { GET_GAMES_BY_TEAM_QUERY } from 'src/pages/Team/TeamPage/components/TeamGames/hooks/useGetGamesByTeamId';

export const UPDATE_GAME_BY_ID_MUTATION = gql`
    ${GAME_FRAGMENT}
    mutation UpdateGameByIdMutation(
        $id: String!
        $input: UpdateGameInput!
        $scores: [CreateScoreInput]!
    ) {
        updateGame(id: $id, input: $input, scores: $scores) {
            ...GameFragment
        }
    }
`;

export const useUpdateGameById = (id: string, showTop: boolean) => {
    const { currentUser, isTeamStaff } = useTeamPlayerAuth();

    const [updateGame, { loading: handleUpdateGameLoading }] = useMutation<
        UpdateGameByIdMutation,
        UpdateGameByIdMutationVariables
    >(UPDATE_GAME_BY_ID_MUTATION, {
        refetchQueries: [
            {
                query: GET_GAMES_BY_TEAM_QUERY,
                variables: {
                    id: currentUser?.player?.teamId || '',
                    limit: 10,
                    page: 1,
                },
            },
        ],
    });

    const handleUpdateGame = async (values: any) => {
        const { scores, topGameScores, ...input } = values;
        const allScores = [...scores, ...(showTop ? topGameScores : [])];

        try {
            await updateGame({
                variables: {
                    id,
                    input: {
                        ...input,
                        date: new Date(input.date),
                    },
                    scores: allScores,
                },
            });
            toast.success(`Wedstrijd aangepast`);
            navigate(routes.gameDetail({ id }));
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        if (isTeamStaff) return;

        toast.error('Je hebt geen toegang voor deze pagina');
        navigate(routes.team());
    }, [currentUser, isTeamStaff]);

    return {
        handleUpdateGame,
        handleUpdateGameLoading,
    };
};
