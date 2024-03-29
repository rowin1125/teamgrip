import {
    GetAllGamesAndTrainingsByTeamId,
    GetAllGamesAndTrainingsByTeamIdVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

export const GET_PLAYER_SCORE_TIMELINE = gql`
    query GetAllGamesAndTrainingsByTeamId($teamId: String!) {
        getAllGamesAndTrainingsByTeamId(teamId: $teamId) {
            players {
                id
                displayName
            }
            games {
                date
                scores {
                    type
                    points
                    playerId
                    trainingId
                    gameId
                }
            }
            trainings {
                date
                scores {
                    type
                    points
                    playerId
                    trainingId
                    gameId
                }
            }
        }
    }
`;

export const useGetAllGamesAndTrainingsByTeamId = () => {
    const { currentUser } = useAuth();
    const { data, loading, error } = useQuery<
        GetAllGamesAndTrainingsByTeamId,
        GetAllGamesAndTrainingsByTeamIdVariables
    >(GET_PLAYER_SCORE_TIMELINE, {
        variables: {
            teamId: currentUser?.player?.teamId || '',
        },
        skip: !currentUser?.player?.teamId,
    });

    return {
        allGamesAndTrainings: data?.getAllGamesAndTrainingsByTeamId,
        loading,
        error,
    };
};
