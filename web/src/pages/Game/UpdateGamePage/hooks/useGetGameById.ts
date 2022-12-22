import { GetGameByIdQuery, GetGameByIdQueryVariables } from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import { GAME_FRAGMENT } from 'src/graphql/fragments/GameFragment';

export const GET_GAME_BY_ID_QUERY = gql`
  ${GAME_FRAGMENT}
  query GetGameByIdQuery($id: String!) {
    game(id: $id) {
      ...GameFragment
    }
  }
`;

export const useGetGameById = () => {
  const { id } = useParams();

  const { data, loading } = useQuery<
    GetGameByIdQuery,
    GetGameByIdQueryVariables
  >(GET_GAME_BY_ID_QUERY, {
    variables: { id: id || '' },
  });

  return {
    game: data?.game,
    gameLoading: loading,
  };
};
