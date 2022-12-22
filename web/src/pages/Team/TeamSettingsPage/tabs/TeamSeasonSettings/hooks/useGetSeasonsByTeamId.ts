import {
  GetSeasonByTeamIdQuery,
  GetSeasonByTeamIdQueryVariables,
} from 'types/graphql';

import { useAuth } from '@redwoodjs/auth';
import { useQuery } from '@redwoodjs/web';

export const GET_SEASON_BY_TEAM_ID_QUERY = gql`
  query GetSeasonByTeamIdQuery($teamId: String!) {
    seasonsByTeamId(teamId: $teamId) {
      id
      name
      active
      trainings {
        id
      }
      games {
        id
      }
      scores {
        id
        _count
      }
    }
  }
`;

export const useGetSeasonsByTeamId = () => {
  const { currentUser } = useAuth();
  const teamId = currentUser?.player?.teamId;

  const { data, loading } = useQuery<
    GetSeasonByTeamIdQuery,
    GetSeasonByTeamIdQueryVariables
  >(GET_SEASON_BY_TEAM_ID_QUERY, {
    variables: { teamId: teamId || '' },
  });

  return { seasons: data?.seasonsByTeamId, loading };
};
