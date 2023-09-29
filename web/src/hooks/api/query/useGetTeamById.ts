import { FindTeamQuery, FindTeamQueryVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { TEAM_FRAGMENT } from 'src/graphql/fragments/TeamFragment';

export const FIND_TEAM_QUERY = gql`
    ${TEAM_FRAGMENT}
    query FindTeamQuery($id: String!) {
        team(id: $id) {
            ...TeamFragment
        }
    }
`;

export const useGetTeamById = () => {
    const { currentUser } = useAuth();
    const teamId = currentUser?.player?.teamId;

    const { data, loading } = useQuery<FindTeamQuery, FindTeamQueryVariables>(
        FIND_TEAM_QUERY,
        {
            variables: { id: teamId || '' },
        }
    );

    return { team: data?.team, loading };
};
