/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import {
    UpdateTrainingMutation,
    UpdateTrainingMutationVariables,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { TRAINING_FRAGMENT } from 'src/graphql/fragments/TrainingFragment';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';
import { GET_TRAININGS_BY_TEAM_QUERY } from 'src/pages/Team/TeamPage/components/TeamTrainings/hooks/useGetTrainingsByTeam';

export const UPDATE_TRAINING_BY_ID_MUTATION = gql`
    ${TRAINING_FRAGMENT}
    mutation UpdateTrainingMutation(
        $id: String!
        $input: UpdateTrainingInput!
        $scores: [CreateScoreInput]!
    ) {
        updateTraining(id: $id, input: $input, scores: $scores) {
            ...TrainingFragment
        }
    }
`;

export const useUpdateTrainingById = (id: string, showTop: boolean) => {
    const { currentUser, isTeamStaff } = useTeamPlayerAuth();

    const [updateTraining, { loading: updateTrainingLoading }] = useMutation<
        UpdateTrainingMutation,
        UpdateTrainingMutationVariables
    >(UPDATE_TRAINING_BY_ID_MUTATION, {
        refetchQueries: [
            {
                query: GET_TRAININGS_BY_TEAM_QUERY,
                variables: {
                    id: currentUser?.player?.teamId || '',
                    limit: 10,
                    page: 1,
                },
            },
        ],
    });

    const handleUpdateTraining = async (values: any) => {
        const { scores, topTrainingScores, ...input } = values;
        const allScores = [...scores, ...(showTop ? topTrainingScores : [])];

        try {
            await updateTraining({
                variables: {
                    id,
                    input: {
                        ...input,
                        date: new Date(input.date),
                    },
                    scores: allScores,
                },
            });
            toast.success(`Training aangepast`);
            navigate(routes.trainingDetail({ id }));
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
        handleUpdateTraining,
        updateTrainingLoading,
    };
};
