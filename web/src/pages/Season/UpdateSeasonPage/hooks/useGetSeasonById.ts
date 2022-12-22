import { GetSeasonByIdQuery, GetSeasonByIdQueryVariables } from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import { SEASON_FRAGMENT } from 'src/graphql/fragments/SeasonFragment';

export const GET_SEASON_BY_ID_QUERY = gql`
  ${SEASON_FRAGMENT}
  query GetSeasonByIdQuery($id: String!) {
    season(id: $id) {
      ...SeasonFragment
    }
  }
`;

export const useGetSeasonById = () => {
  const { id } = useParams();

  const { data, loading } = useQuery<
    GetSeasonByIdQuery,
    GetSeasonByIdQueryVariables
  >(GET_SEASON_BY_ID_QUERY, {
    variables: { id: id || '' },
  });

  return { season: data?.season, seasonLoading: loading };
};
