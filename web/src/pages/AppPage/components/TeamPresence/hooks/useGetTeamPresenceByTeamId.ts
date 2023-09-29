import {
    GetPlayersPresenceQuery,
    GetPlayersPresenceQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

export const GET_TEAM_PRESENCE_BY_TEAM_ID_QUERY = gql`
    query GetPlayersPresenceQuery($teamId: String!) {
        getPlayersPresenceByTeamId(teamId: $teamId) {
            displayName
            trainings {
                id
                date
            }
            games {
                id
                date
            }
        }
    }
`;

export const useGetPlayersPresence = () => {
    const { currentUser } = useTeamPlayerAuth();
    const { data, loading, error } = useQuery<
        GetPlayersPresenceQuery,
        GetPlayersPresenceQueryVariables
    >(GET_TEAM_PRESENCE_BY_TEAM_ID_QUERY, {
        variables: {
            teamId: currentUser?.player?.teamId || '',
        },
    });

    return {
        teamPresence: data?.getPlayersPresenceByTeamId,
        teamPresenceLoading: loading,
        error,
    };
};
