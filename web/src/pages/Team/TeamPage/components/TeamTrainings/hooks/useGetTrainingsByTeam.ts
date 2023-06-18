import {
  TrainingByTeamIdQuery,
  TrainingByTeamIdQueryVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { useQuery } from '@redwoodjs/web';

import { useEffect } from 'react';
import { TRAINING_FRAGMENT } from 'src/graphql/fragments/TrainingFragment';

export const GET_TRAININGS_BY_TEAM_QUERY = gql`
  ${TRAINING_FRAGMENT}
  query TrainingByTeamIdQuery($id: String!, $limit: Int!, $page: Int!) {
    trainingByTeamId(id: $id, limit: $limit, page: $page) {
      trainings {
        ...TrainingFragment
      }
      total
    }
  }
`;

export const useGetTrainingsByTeam = (page: number) => {
  const { currentUser } = useAuth();
  const limit = 10;

  const { data, loading, refetch } = useQuery<
    TrainingByTeamIdQuery,
    TrainingByTeamIdQueryVariables
  >(GET_TRAININGS_BY_TEAM_QUERY, {
    variables: { id: currentUser?.player?.teamId || '', limit, page },
  });

  useEffect(() => {
    refetch({ id: currentUser?.player?.teamId || '', limit, page });
  }, [page]);

  return {
    trainings: data?.trainingByTeamId?.trainings,
    total: data?.trainingByTeamId?.total,
    limit,
    trainingsLoading: loading,
  };
};
