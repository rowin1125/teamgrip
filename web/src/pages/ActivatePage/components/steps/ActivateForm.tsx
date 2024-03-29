/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Box, Button, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import {
    ActivateUserInput,
    ActivateUserMutation,
    ActivateUserMutationVariables,
} from 'types/graphql';
import * as Yup from 'yup';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import ControlledInput from 'src/components/forms/components/ControlledInput';

const ACTIVATE_USER = gql`
    mutation ActivateUserMutation($input: ActivateUserInput!) {
        activateUser(input: $input) {
            id
            email
        }
    }
`;

type ActivateFormProps = {
    setActivateStep: (step: number) => void;
    handlePlayVideo: () => void;
};

const ActivateForm = ({ setActivateStep }: ActivateFormProps) => {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const { logIn, currentUser } = useAuth();
    const { token, email } = useParams();
    const decodedEmail = decodeURI(email);

    const [activate, { loading }] = useMutation<
        ActivateUserMutation,
        ActivateUserMutationVariables
    >(ACTIVATE_USER);

    const onSubmit = async (data: ActivateUserInput) => {
        try {
            setLoadingLogin(true);
            const result = await logIn({
                username: decodedEmail,
                password: data.password,
            });

            if ((result.error as string).includes('Incorrect password')) {
                toast.error('Password incorrect');
                setLoadingLogin(false);
                return;
            }

            // Workaround for making sure the password is correct before activating someone
            if ((result.error as string).includes('Please validate')) {
                await activate({ variables: { input: { ...data, token } } });
                await logIn({
                    username: decodedEmail,
                    password: data.password,
                });
                setActivateStep(1);
                toast.success('Account actief!');

                return;
            }

            setLoadingLogin(false);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    useEffect(() => {
        if (currentUser?.verified) setActivateStep(1);
    }, [currentUser, setActivateStep]);

    return (
        <Formik
            initialValues={{
                token,
                password: '',
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string().required('Password is required'),
            })}
            onSubmit={onSubmit}
        >
            <Box as={Form} w="full">
                <Heading color="white">Even dubbelchecken!</Heading>
                <ControlledInput
                    id="password"
                    label="Bevestig je wachtwoord en activeer je account"
                    placeholder="Jouw super geheime wachtwoord"
                    type="password"
                />
                <Button
                    colorScheme="secondary"
                    type="submit"
                    mt={4}
                    isLoading={loading || loadingLogin}
                >
                    Activeer
                </Button>
            </Box>
        </Formik>
    );
};

export default ActivateForm;
