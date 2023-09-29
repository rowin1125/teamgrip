import {
    GetPlayerByGhostInvitationQuery,
    GetPlayerByGhostInvitationQueryVariables,
} from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import { PLAYER_FRAGMENT } from 'src/graphql/fragments/PlayerFragment';

const GET_GHOST_PLAYER_BY_GHOST_INVITATIONS = gql`
    ${PLAYER_FRAGMENT}
    query GetPlayerByGhostInvitationQuery($ghostInvitation: String!) {
        getGhostPlayerByInvitation(ghostInvitation: $ghostInvitation) {
            ...PlayerFragment
        }
    }
`;

export const useGhostTeamInvitation = () => {
    const { ghostInvitation } = useParams();

    const { data: ghostPlayer, loading } = useQuery<
        GetPlayerByGhostInvitationQuery,
        GetPlayerByGhostInvitationQueryVariables
    >(GET_GHOST_PLAYER_BY_GHOST_INVITATIONS, {
        variables: { ghostInvitation: ghostInvitation || '' },
    });

    return {
        ghostPlayer: ghostPlayer?.getGhostPlayerByInvitation,
        getGhostPlayerIsLoading: loading,
    };
};
