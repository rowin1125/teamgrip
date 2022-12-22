import {
  GetRecentGamesQuery,
  GetRecentGamesQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

export const GET_RECENT_TRAININGS_QUERY = gql`
  query GetRecentGamesQuery($playerId: String!, $limit: Int!) {
    getRecentGames(playerId: $playerId, limit: $limit) {
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

export const useGetRecentGamePoints = () => {
  const { currentUser } = useTeamPlayerAuth();
  const { data, loading, error } = useQuery<
    GetRecentGamesQuery,
    GetRecentGamesQueryVariables
  >(GET_RECENT_TRAININGS_QUERY, {
    variables: {
      playerId: currentUser?.player?.id || '',
      limit: 10,
    },
  });

  return {
    recentGames: data?.getRecentGames,
    loading,
    error,
  };
};
