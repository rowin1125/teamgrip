import {
    GetTrainingByIdQuery,
    GetTrainingByIdQueryVariables,
} from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import { TRAINING_FRAGMENT } from 'src/graphql/fragments/TrainingFragment';

export const GET_TRAINING_BY_ID_QUERY = gql`
    ${TRAINING_FRAGMENT}
    query GetTrainingByIdQuery($id: String!) {
        training(id: $id) {
            ...TrainingFragment
        }
    }
`;

export const useGetTrainingById = () => {
    const { id } = useParams();
    const { data, loading } = useQuery<
        GetTrainingByIdQuery,
        GetTrainingByIdQueryVariables
    >(GET_TRAINING_BY_ID_QUERY, {
        variables: { id: id || '' },
    });

    return {
        training: data?.training,
        trainingLoading: loading,
    };
};
