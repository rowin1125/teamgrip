import { Box, Button, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { MetaTags } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import Card from 'src/components/Card/Card';
import ControlledInput from 'src/components/forms/components/ControlledInput';
import ControlledSelect from 'src/components/forms/components/ControlledSelect';
import ControlledSwitch from 'src/components/forms/components/ControlledSwitch/ControlledSwitch';
import DefaultLoader from 'src/components/Loaders/DefaultLoader/DefaultLoader';
import TextAlert from 'src/components/TextAlert/TextAlert';
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

import NewClubModal from './components/NewClubModal/NewClubModal';
import { handleTeamNameTransformation } from './helpers/handleTeamnameTransformation/handleTeamnameTransformation';
import { useCreateTeam } from './hooks/useCreateTeam';
import { useGetClubs } from './hooks/useGetClubs';

const NewTeamPage = () => {
    const { currentUser } = useAuth();
    const { clubs, clubsLoading } = useGetClubs();
    const { handleCreateTeam, loading } = useCreateTeam(clubs);

    const validationSchema = Yup.object().shape({
        clubId: Yup.string().required('Club is verplicht'),
        name: Yup.string().min(4).required('Naam is verplicht'),
        scoreModuleActive: Yup.boolean().required('Score module is verplicht'),
    });

    return (
        <>
            <MetaTags title="Nieuwe team" description="NewTeam page" />

            <Grid templateColumns="repeat(3, 1fr)" gap={{ xl: 10 }}>
                <GridItem colSpan={{ base: 3, xl: 2 }}>
                    <Card>
                        <DefaultLoader isLoading={loading || clubsLoading}>
                            <Heading>Maak nu je eigen team aan 💪</Heading>
                            <Formik
                                onSubmit={handleCreateTeam}
                                initialValues={{
                                    name: '',
                                    clubId: '',
                                    ownerId: currentUser?.id || '',
                                    ownerIsPlayer: false,
                                    clubTeamName: '',
                                    scoreModuleActive: true,
                                }}
                                validationSchema={validationSchema}
                            >
                                {({ values, setFieldValue }) => {
                                    const { name, clubId } = values;
                                    const club = clubs?.find(
                                        (club) => club.id === clubId
                                    );
                                    const customTeamName =
                                        club &&
                                        name &&
                                        `${capitalizeText(
                                            club.name
                                        )} ${capitalizeText(name)}`;
                                    return (
                                        <Box as={Form} w="full" maxW="500px">
                                            <TextAlert status="info" mt={4}>
                                                <Box>
                                                    <Text>
                                                        Staat je club er niet
                                                        bij? Klik dan op de
                                                        button hieronder om een
                                                        nieuwe club aan te
                                                        maken.
                                                    </Text>
                                                    <NewClubModal
                                                        setFieldValue={
                                                            setFieldValue
                                                        }
                                                    />
                                                </Box>
                                            </TextAlert>
                                            <ControlledSelect
                                                id="clubId"
                                                label="Club"
                                                options={clubs?.map(
                                                    ({ name, id }) => ({
                                                        label: capitalizeText(
                                                            name
                                                        ),
                                                        value: id,
                                                    })
                                                )}
                                                placeholder="Selecteer"
                                                reactSelectProps={{
                                                    isClearable: true,
                                                }}
                                            />
                                            <ControlledInput
                                                id="name"
                                                label="Teamnaam"
                                                placeholder="Zaterdag-1"
                                                transformValue={
                                                    handleTeamNameTransformation
                                                }
                                                helperText="Letop: De teamnaam mag alleen bestaan uit nummers, letters en dashes: Zaterdag-1, Zatedag-JO-17-2"
                                            />
                                            <ControlledSwitch
                                                id="ownerIsPlayer"
                                                helperText="Actieveer dit als de eigenaar zelf als speler wilt deelnemen aan de training / competitie van het team."
                                            >
                                                Eigenaar is een actieve speler
                                                van het team?
                                            </ControlledSwitch>
                                            <Button
                                                mt={8}
                                                colorScheme="secondary"
                                                type="submit"
                                                isLoading={loading}
                                            >
                                                Maak{' '}
                                                {customTeamName
                                                    ? customTeamName
                                                    : 'team'}{' '}
                                                aan
                                            </Button>
                                        </Box>
                                    );
                                }}
                            </Formik>
                        </DefaultLoader>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default NewTeamPage;
