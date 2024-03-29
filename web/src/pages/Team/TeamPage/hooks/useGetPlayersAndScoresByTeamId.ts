import {
    GetPlayersAndScoresByTeamId,
    GetPlayersAndScoresByTeamIdVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

export const GET_PLAYERS_AND_SCORES_BY_TEAM_ID = gql`
    query GetPlayersAndScoresByTeamId($teamId: String!, $limit: Int) {
        getPlayersAndScoresByTeamId(teamId: $teamId, limit: $limit) {
            id
            totalScore
            displayName
            user {
                avatar {
                    avatarStyle
                    topType
                    accessoriesType
                    hatColor
                    hairColor
                    facialHairType
                    facialHairColor
                    clotheType
                    clotheColor
                    graphicType
                    eyeType
                    eyebrowType
                    mouthType
                    skinColor
                }
            }
        }
    }
`;

export const useGetPlayersAndScoresByTeamId = (
    amount?: number,
    teamId?: string
) => {
    const { currentUser } = useAuth();

    const queryTeamId = teamId || currentUser?.player?.teamId;

    const { data: playersWithTotalScore, loading } = useQuery<
        GetPlayersAndScoresByTeamId,
        GetPlayersAndScoresByTeamIdVariables
    >(GET_PLAYERS_AND_SCORES_BY_TEAM_ID, {
        variables: { teamId: queryTeamId || '', limit: amount },
    });

    return {
        playersWithTotalScore:
            playersWithTotalScore?.getPlayersAndScoresByTeamId,
        playersWithTotalScoreLoading: loading,
    };
};
