import {
    GetRecentTrainingsQuery,
    GetRecentTrainingsQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

export const GET_RECENT_TRAININGS_QUERY = gql`
    query GetRecentTrainingsQuery(
        $playerId: String!
        $limit: Int!
        $teamId: String!
    ) {
        getRecentTrainings(
            playerId: $playerId
            limit: $limit
            teamId: $teamId
        ) {
            id
            date
            scores {
                id
                points
                type
                playerId
            }
        }
    }
`;

export const useGetRecentTrainingPoints = (playerId?: string) => {
    const { currentUser } = useTeamPlayerAuth();
    const queryPlayerId = playerId || currentUser?.player?.id;
    console.log('queryPlayerId', queryPlayerId);
    const { data, loading, error } = useQuery<
        GetRecentTrainingsQuery,
        GetRecentTrainingsQueryVariables
    >(GET_RECENT_TRAININGS_QUERY, {
        variables: {
            playerId: queryPlayerId || '',
            limit: 10,
            teamId: currentUser?.player?.teamId || '',
        },
    });

    return {
        recentTrainings: data?.getRecentTrainings,
        loading,
        error,
    };
};
