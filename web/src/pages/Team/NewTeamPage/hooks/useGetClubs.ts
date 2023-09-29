import { GetClubsQuery } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

const GET_CLUBS_QUERY = gql`
    query GetClubsQuery {
        clubs {
            id
            name
        }
    }
`;

export const useGetClubs = () => {
    const { data, loading: clubsLoading } =
        useQuery<GetClubsQuery>(GET_CLUBS_QUERY);

    return {
        clubs: data?.clubs,
        clubsLoading,
    };
};
