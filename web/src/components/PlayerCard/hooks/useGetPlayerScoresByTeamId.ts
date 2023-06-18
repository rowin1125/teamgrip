import {
  GetPlayerScoresByTeamId,
  GetPlayerScoresByTeamIdVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { useQuery } from '@redwoodjs/web';

export const GET_PLAYER_SCORES_BY_TEAM_ID = gql`
  query GetPlayerScoresByTeamId($teamId: String!) {
    getPlayerScoresByTeamId(teamId: $teamId) {
      id
      totalScore
      avgScore
      displayName
      scores {
        points
      }
      activeSeason {
        name
      }
    }
  }
`;

export const useGetPlayerScoresByTeamId = () => {
  const { currentUser } = useAuth();

  const { data: playerWithTotalScore, loading } = useQuery<
    GetPlayerScoresByTeamId,
    GetPlayerScoresByTeamIdVariables
  >(GET_PLAYER_SCORES_BY_TEAM_ID, {
    variables: { teamId: currentUser?.player?.teamId || '' },
  });

  return {
    playerWithTotalScore: playerWithTotalScore?.getPlayerScoresByTeamId,
    playerWithTotalScoreLoading: loading,
  };
};
