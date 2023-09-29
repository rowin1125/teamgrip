import { useEffect, useState } from 'react';

import {
    CreateClubInput,
    CreateClubMutation,
    CreateClubMutationVariables,
    SearchClubByTermQuery,
    SearchClubByTermQueryVariables,
} from 'types/graphql';
import * as Yup from 'yup';

import { useMutation, useQuery } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { CREATE_CLUB_MUTATION } from 'src/components/Club/NewClub';
import useDebounce from 'src/hooks/global/useDebounce';

import { GET_CLUBS_QUERY } from '../../../hooks/useGetClubs';

export const SEARCH_CLUB_BY_TERM_QUERY = gql`
    query SearchClubByTermQuery($term: String!) {
        clubSearch(term: $term) {
            id
            name
        }
    }
`;

type UseNewClubFormType = {
    onClose: () => void;
    setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
    ) => void;
};

export const useNewClubForm = ({
    onClose,
    setFieldValue,
}: UseNewClubFormType) => {
    const [searchTerm, setSearchTerm] = useState('');

    const [clubExists, setClubExists] = React.useState(false);
    const [clubIsValidated, setClubIsValidated] = React.useState(false);
    const [userValidationOverride, setUserValidationOverride] =
        React.useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2).required('Naam is verplicht'),
    });

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data, refetch } = useQuery<
        SearchClubByTermQuery,
        SearchClubByTermQueryVariables
    >(SEARCH_CLUB_BY_TERM_QUERY, {
        variables: {
            term: debouncedSearchTerm,
        },
        skip: debouncedSearchTerm.length < 2,
        onCompleted: (data) => {
            setClubIsValidated(true);
            setClubExists(!!data.clubSearch.length);
            setUserValidationOverride(false);
        },
    });

    const [createClub, { loading }] = useMutation<
        CreateClubMutation,
        CreateClubMutationVariables
    >(CREATE_CLUB_MUTATION, {
        refetchQueries: [
            {
                query: GET_CLUBS_QUERY,
            },
        ],
    });

    const handleCreateClub = async (values: CreateClubInput) => {
        try {
            const club = await createClub({
                variables: {
                    input: values,
                },
            });
            toast.success(`Club ${values.name} succesvol aangemaakt!`);
            onClose();
            if (!club.data?.createClub.id) return;

            setFieldValue('clubId', club.data?.createClub.id);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        refetch({ term: debouncedSearchTerm });
    }, [debouncedSearchTerm, refetch]);

    const isAbleToSubmit =
        (clubIsValidated && !clubExists) || userValidationOverride;

    return {
        data,
        validationSchema,
        clubExists,
        clubIsValidated,
        handleCreateClub,
        isAbleToSubmit,
        loading,
        setSearchTerm,
        userValidationOverride,
        setUserValidationOverride,
    };
};
