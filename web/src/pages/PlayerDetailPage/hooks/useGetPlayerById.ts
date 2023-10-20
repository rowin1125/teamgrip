import { GetPlayerByIdQuery, GetPlayerByIdQueryVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

type UseGetPlayerByIdType = {
    id?: string;
};

export const GET_PLAYER_BY_ID_QUERY = gql`
    query GetPlayerByIdQuery($id: String!) {
        player(id: $id) {
            id
            teamId
            isActivePlayer
            isGhost
            playerType
            displayName
        }
    }
`;

export const useGetPlayerById = ({ id }: UseGetPlayerByIdType = {}) => {
    const { data, ...query } = useQuery<
        GetPlayerByIdQuery,
        GetPlayerByIdQueryVariables
    >(GET_PLAYER_BY_ID_QUERY, {
        variables: { id: id || '' },
        skip: !id,
    });

    return {
        player: data?.player,
        ...query,
    };
};
