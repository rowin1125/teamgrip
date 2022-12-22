import { GamesByTeamIdQuery, GamesByTeamIdQueryVariables } from 'types/graphql';

import { useAuth } from '@redwoodjs/auth';
import { useQuery } from '@redwoodjs/web';

import { GAME_FRAGMENT } from 'src/graphql/fragments/GameFragment';

export const GET_GAMES_BY_TEAM_QUERY = gql`
  ${GAME_FRAGMENT}
  query GamesByTeamIdQuery($id: String!) {
    gamesByTeamId(id: $id) {
      ...GameFragment
    }
  }
`;

export const useGetGamesByTeamId = () => {
  const { currentUser } = useAuth();

  const { data: games, loading } = useQuery<
    GamesByTeamIdQuery,
    GamesByTeamIdQueryVariables
  >(GET_GAMES_BY_TEAM_QUERY, {
    variables: { id: currentUser?.player?.teamId || '' },
  });

  return { games: games?.gamesByTeamId, gamesLoading: loading };
};
