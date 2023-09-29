import {
    GetHistoryPlayersByTeamIdQuery,
    GetHistoryPlayersByTeamIdQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

export const GET_HISTORY_PLAYERS_BY_TEAM_ID_QUERY = gql`
    query GetHistoryPlayersByTeamIdQuery($teamId: String!) {
        getHistoryPlayersByTeamId(teamId: $teamId) {
            id
            displayName
            teamId
        }
    }
`;

export const useGetHistoryPlayersByTeamId = () => {
    const { currentUser } = useAuth();

    const { data, loading } = useQuery<
        GetHistoryPlayersByTeamIdQuery,
        GetHistoryPlayersByTeamIdQueryVariables
    >(GET_HISTORY_PLAYERS_BY_TEAM_ID_QUERY, {
        variables: { teamId: currentUser?.player?.teamId || '' },
    });

    return {
        historyPlayersData: data?.getHistoryPlayersByTeamId,
        historyPlayersLoading: loading,
    };
};
