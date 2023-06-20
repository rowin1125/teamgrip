import { GamesByTeamIdQuery, GamesByTeamIdQueryVariables } from 'types/graphql';

import { useAuth } from 'src/auth';
import { useQuery } from '@redwoodjs/web';

import { GAME_FRAGMENT } from 'src/graphql/fragments/GameFragment';
import { useEffect } from 'react';

export const GET_GAMES_BY_TEAM_QUERY = gql`
  ${GAME_FRAGMENT}
  query GamesByTeamIdQuery($id: String!, $limit: Int!, $page: Int!) {
    gamesByTeamId(id: $id, limit: $limit, page: $page) {
      games {
        ...GameFragment
      }
      total
    }
  }
`;

export const useGetGamesByTeamId = (page: number) => {
  const { currentUser } = useAuth();
  const limit = 10;

  const { data, loading, refetch } = useQuery<
    GamesByTeamIdQuery,
    GamesByTeamIdQueryVariables
  >(GET_GAMES_BY_TEAM_QUERY, {
    variables: { id: currentUser?.player?.teamId || '', limit, page },
  });

  useEffect(() => {
    refetch({ id: currentUser?.player?.teamId || '', limit, page });
  }, [page]);

  return {
    games: data?.gamesByTeamId?.games,
    gamesLoading: loading,
    limit,
    total: data?.gamesByTeamId?.total,
  };
};
