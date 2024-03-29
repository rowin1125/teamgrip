/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { navigate, routes } from '@redwoodjs/router';
import { MetaTags, useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import Card from 'src/components/Card/Card';

import Avatar from '../ActivatePage/components/steps/Avatar/components/Avatar';
import AvatarFormFields from '../ActivatePage/components/steps/Avatar/components/AvatarFormFields';
import { generateRandomAvatarOptions } from '../ActivatePage/components/steps/Avatar/helpers/generateRandomAvatar';

const UPDATE_AVATAR_MUTATION = gql`
    mutation UpdateAvatar($id: String!, $input: UpdateAvatarInput!) {
        updateAvatar(id: $id, input: $input) {
            id
        }
    }
`;

const UpdateAvatarPage = () => {
    const { currentUser, reauthenticate } = useAuth();

    const [updateAvatar, { loading }] = useMutation(UPDATE_AVATAR_MUTATION, {
        // HACK to trigger refetch of the current user
        // https://community.redwoodjs.com/t/data-not-reloaded-properly/1678/2
        onCompleted: reauthenticate,
    });

    const onSubmit = async (data: any) => {
        try {
            await updateAvatar({
                variables: {
                    id: currentUser?.avatar?.id || '',
                    input: {
                        ...data,
                    },
                },
            });
            toast.success('Avatar is succesvol aangepast 👍');
            navigate(routes.settings());
        } catch (error) {
            console.error(error);
            toast.error('Oeps er is iets fout gegaan 😢');
        }
    };

    let avatarValues;

    if (currentUser?.avatar) {
        const { id, ...initalAvatarValues } = currentUser.avatar;
        avatarValues = initalAvatarValues;
    } else {
        avatarValues = {
            avatarStyle: 'Circle',
            topType: 'NoHair',
            accessoriesType: 'Blank',
            hatColor: 'Black',
            hairColor: 'Black',
            facialHairType: 'BeardMagestic',
            facialHairColor: 'Black',
            clotheType: 'CollarSweater',
            clotheColor: 'PastelBlue',
            graphicType: 'Bear',
            eyeType: 'Default',
            eyebrowType: 'Default',
            mouthType: 'Default',
            skinColor: 'DarkBrown',
        };
    }

    if (!avatarValues) return null;

    return (
        <>
            <MetaTags title="Update avatar" description="UpdateAvatar page" />

            <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
                <GridItem colSpan={{ base: 3, xl: 2 }}>
                    <Card>
                        <Heading>Update jouw avatar</Heading>
                        <Formik
                            initialValues={avatarValues}
                            onSubmit={onSubmit}
                        >
                            {({ setValues }) => {
                                const handleRandomValues = () => {
                                    const randomValues =
                                        generateRandomAvatarOptions();
                                    setValues({
                                        avatarStyle: 'Circle',
                                        ...randomValues,
                                    });
                                };
                                return (
                                    <Box as={Form} w="full">
                                        <Flex
                                            justifyContent="center"
                                            alignItems="center"
                                            mb={4}
                                            flexDirection="column"
                                        >
                                            <Avatar />
                                        </Flex>
                                        <AvatarFormFields />
                                        <Flex
                                            justifyContent="center"
                                            alignItems="center"
                                            mt={4}
                                        >
                                            <Button
                                                type="submit"
                                                colorScheme="primary"
                                                isLoading={loading}
                                            >
                                                Update avatar
                                            </Button>
                                            <Button
                                                ml={4}
                                                onClick={handleRandomValues}
                                                colorScheme="secondary"
                                                isLoading={loading}
                                            >
                                                Random
                                            </Button>
                                        </Flex>
                                    </Box>
                                );
                            }}
                        </Formik>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default UpdateAvatarPage;
