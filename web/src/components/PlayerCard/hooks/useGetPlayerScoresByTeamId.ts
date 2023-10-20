import {
    GetPlayerScoresByTeamId,
    GetPlayerScoresByTeamIdVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { AVATAR_FRAGMENT } from 'src/graphql/fragments/AvatarFragment';

export const GET_PLAYER_SCORES_BY_TEAM_ID = gql`
    ${AVATAR_FRAGMENT}
    query GetPlayerScoresByTeamId($teamId: String!, $playerId: String) {
        getPlayerScoresByTeamId(teamId: $teamId, playerId: $playerId) {
            id
            totalScore
            avgScore
            displayName
            scores {
                points
            }
            user {
                ...AvatarFragment
                userProfile {
                    firstname
                }
            }
            activeSeason {
                name
            }
        }
    }
`;

type UseGetPlayerScoresByTeamId = {
    playerId?: string;
};

export const useGetPlayerScoresByTeamId = ({
    playerId,
}: UseGetPlayerScoresByTeamId = {}) => {
    const { currentUser } = useAuth();

    const { data: playerWithTotalScore, loading } = useQuery<
        GetPlayerScoresByTeamId,
        GetPlayerScoresByTeamIdVariables
    >(GET_PLAYER_SCORES_BY_TEAM_ID, {
        variables: { teamId: currentUser?.player?.teamId || '', playerId },
    });

    return {
        playerWithTotalScore: playerWithTotalScore?.getPlayerScoresByTeamId,
        playerWithTotalScoreLoading: loading,
    };
};
