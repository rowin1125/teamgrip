import {
  GetTeamPlayersForSettings,
  GetTeamPlayersForSettingsVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { useQuery } from '@redwoodjs/web';

export const GET_TEAM_PLAYERS_FOR_SETTINGS = gql`
  query GetTeamPlayersForSettings($id: String!) {
    teamExtraDetails(id: $id) {
      players {
        id
        playerType
        displayName
        user {
          id
          userProfile {
            firstname
            lastname
          }
        }
      }
    }
  }
`;

export const useGetTeamPlayersForSettings = () => {
  const { currentUser } = useAuth();
  const { data, loading, error } = useQuery<
    GetTeamPlayersForSettings,
    GetTeamPlayersForSettingsVariables
  >(GET_TEAM_PLAYERS_FOR_SETTINGS, {
    variables: {
      id: currentUser?.player?.teamId,
    },
  });

  return {
    teamWithExtra: data?.teamExtraDetails,
    teamWithExtraLoading: loading,
    error,
  };
};
