/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import {
    CreateScoreInput,
    CreateTrainingMutation,
    CreateTrainingMutationVariables,
    FindTeamQuery,
    GetPlayersForTeamQuery,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { TRAINING_FRAGMENT } from 'src/graphql/fragments/TrainingFragment';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';
import { GET_TRAININGS_BY_TEAM_QUERY } from 'src/pages/Team/TeamPage/components/TeamTrainings/hooks/useGetTrainingsByTeam';

export const CREATE_TRAINING_MUTATION = gql`
    ${TRAINING_FRAGMENT}
    mutation CreateTrainingMutation(
        $input: CreateTrainingInput!
        $scores: [CreateScoreInput]!
    ) {
        createTraining(input: $input, scores: $scores) {
            ...TrainingFragment
        }
    }
`;

type UseCreateTrainingType = {
    playersData?: GetPlayersForTeamQuery;
    team?: FindTeamQuery['team'];
    showTop?: boolean;
};

export const scoreBlueprint: CreateScoreInput = {
    playerId: '',
    points: 0,
    seasonId: '',
    trainingId: '',
    type: 'TRAINING',
    teamId: '',
};

export const useCreateTraining = ({
    playersData,
    team,
    showTop,
}: UseCreateTrainingType) => {
    const { currentUser, isTeamStaff } = useTeamPlayerAuth();

    const [createTraining, { loading: createTrainingLoading }] = useMutation<
        CreateTrainingMutation,
        CreateTrainingMutationVariables
    >(CREATE_TRAINING_MUTATION, {
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

    const handleCreateTraining = async (values: any) => {
        const { scores, topTrainingScores, ...input } = values;
        const allScores = [...scores, ...(showTop ? topTrainingScores : [])];

        try {
            const training = await createTraining({
                variables: {
                    input: {
                        ...input,
                        date: new Date(input.date),
                    },
                    scores: allScores,
                },
            });
            toast.success(`Training aangemaakt`);
            navigate(
                routes.trainingDetail({
                    id: training.data?.createTraining.id || '',
                })
            );
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (team && team.season?.length === 0) {
            toast.error(
                'Je moet eerst een seizoen aanmaken voor je een training kan aanmaken'
            );
            navigate(routes.team());
        }
    }, [team]);

    useEffect(() => {
        if (isTeamStaff) return;

        toast.error('Je hebt geen toegang voor deze pagina');
        navigate(routes.team());
    }, [currentUser, isTeamStaff]);

    const seasonMatchesThisYear = team?.season?.filter(
        (season) => season?.active
    )?.[0]?.id;

    const defaultSeasonId = seasonMatchesThisYear ?? team?.season[0]?.id;

    const initialScoresInputValues: CreateScoreInput[] =
        playersData?.playersForTeam.map((player) => ({
            ...scoreBlueprint,
            seasonId: defaultSeasonId || '',
            playerId: player?.id || '',
            teamId: currentUser?.player?.teamId || '',
        })) || [];

    const initialTopTrainingScores: CreateScoreInput[] = [
        {
            ...scoreBlueprint,
            playerId: '',
            type: 'TOP_TRAINING',
            points: 50,
            seasonId: defaultSeasonId || '',
            teamId: team?.id || '',
            trainingId: '',
        },
        {
            ...scoreBlueprint,
            playerId: '',
            type: 'TOP_TRAINING',
            points: 50,
            seasonId: defaultSeasonId || '',
            teamId: team?.id || '',
            trainingId: '',
        },
        {
            ...scoreBlueprint,
            playerId: '',
            type: 'TOP_TRAINING',
            points: 50,
            seasonId: defaultSeasonId || '',
            teamId: team?.id || '',
            trainingId: '',
        },
    ];

    return {
        handleCreateTraining,
        createTrainingLoading,
        initialScoresInputValues,
        defaultTeamSeasonId: defaultSeasonId,
        initialTopTrainingScores,
    };
};
