import { GetClubByIdQuery, GetClubByIdQueryVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { CLUB_FRAGMENT } from 'src/graphql/fragments/ClubFragment';

export const GET_CLUB_BY_ID_QUERY = gql`
    ${CLUB_FRAGMENT}
    query GetClubByIdQuery($id: String!) {
        club(id: $id) {
            ...ClubFragment
            players {
                id
            }
        }
    }
`;

export const useGetClubById = () => {
    const { currentUser } = useAuth();
    if (!currentUser)
        return {
            club: null,
            loading: true,
            error: null,
        };

    const { data, loading, error } = useQuery<
        GetClubByIdQuery,
        GetClubByIdQueryVariables
    >(GET_CLUB_BY_ID_QUERY, {
        variables: { id: currentUser?.player?.clubId || '' },
    });

    return {
        club: data?.club,
        clubLoading: loading,
        error,
    };
};
