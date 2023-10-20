import {
    GetRecentGamesQuery,
    GetRecentGamesQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

export const GET_RECENT_TRAININGS_QUERY = gql`
    query GetRecentGamesQuery(
        $playerId: String!
        $limit: Int!
        $teamId: String!
    ) {
        getRecentGames(playerId: $playerId, limit: $limit, teamId: $teamId) {
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

export const useGetRecentGamePoints = (playerId?: string) => {
    const { currentUser } = useTeamPlayerAuth();
    const queryPlayerId = playerId || currentUser?.player?.id;

    const { data, loading, error } = useQuery<
        GetRecentGamesQuery,
        GetRecentGamesQueryVariables
    >(GET_RECENT_TRAININGS_QUERY, {
        variables: {
            playerId: queryPlayerId || '',
            limit: 10,
            teamId: currentUser?.player?.teamId || '',
        },
    });

    return {
        recentGames: data?.getRecentGames,
        loading,
        error,
    };
};
