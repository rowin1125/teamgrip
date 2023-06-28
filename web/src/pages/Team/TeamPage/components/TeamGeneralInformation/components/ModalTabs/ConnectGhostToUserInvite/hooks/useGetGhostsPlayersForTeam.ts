import {
  GetGhostPlayersForTeamQuery,
  GetGhostPlayersForTeamQueryVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { useQuery } from '@redwoodjs/web';

import { PLAYER_FRAGMENT } from 'src/graphql/fragments/PlayerFragment';

export const GET_GHOST_PLAYERS_FOR_BY_TEAM_ID = gql`
  ${PLAYER_FRAGMENT}
  query GetGhostPlayersForTeamQuery($teamId: String!) {
    getGhostPlayersByTeamId(teamId: $teamId) {
      ...PlayerFragment
    }
  }
`;

export const useGetGhostsPlayersForTeam = () => {
  const { currentUser } = useAuth();

  const { data: ghostPlayers, loading } = useQuery<
    GetGhostPlayersForTeamQuery,
    GetGhostPlayersForTeamQueryVariables
  >(GET_GHOST_PLAYERS_FOR_BY_TEAM_ID, {
    variables: { teamId: currentUser?.player?.teamId || '' },
  });

  return {
    ghostPlayers: ghostPlayers?.getGhostPlayersByTeamId,
    ghostPlayersLoading: loading,
  };
};
