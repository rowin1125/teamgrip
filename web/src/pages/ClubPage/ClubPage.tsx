/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';

import { MetaTags } from '@redwoodjs/web';

import Card from 'src/components/Card/Card';
import DataDisplay from 'src/components/DataDisplay/DataDisplay';
import DefaultLoader from 'src/components/Loaders/DefaultLoader/DefaultLoader';
import TeamTable from 'src/components/TeamTable';
import { allWordsCapitalized } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

import TeamNotFoundMessage from '../Team/TeamPage/components/TeamNotFoundMessage';

import { useGetClubById } from './hooks/useGetClubById';

const ClubPage = () => {
    const { club, clubLoading } = useGetClubById();

    if (!club?.id && !clubLoading)
        return (
            <>
                <MetaTags title="Mijn Club" description="Club page" />
                <TeamNotFoundMessage title="Mijn Club" type="club" />
            </>
        );

    const totalAmountOfGames = club?.teams?.reduce((acc, team) => {
        if (!team?.games?.length) return acc + 0;

        return acc + team?.games?.length;
    }, 0);

    const totalAmountOfTrainings = club?.teams?.reduce((acc, team) => {
        if (!team?.trainings?.length) return acc + 0;

        return acc + team?.trainings?.length;
    }, 0);

    return (
        <>
            <MetaTags title="Mijn Club" description="Club page" />
            <Grid
                templateColumns="repeat(12, 1fr)"
                templateRows="auto"
                gap={{ base: 0, xl: 10 }}
                rowGap={{ base: 10 }}
            >
                <GridItem colSpan={{ base: 12 }} rowSpan={1}>
                    <Heading as="h1" size="2xl" color="white">
                        Club dashboard {club?.name}
                    </Heading>
                </GridItem>
                <GridItem colSpan={{ base: 12, xl: 4 }}>
                    <DefaultLoader isLoading={clubLoading}>
                        <Card position="sticky" top={10}>
                            <Heading as="h1" size="lg" mb={8}>
                                Mijn Club
                            </Heading>

                            <DataDisplay
                                entry={{
                                    'Club naam': club?.name,
                                    'Aantal teams': club?.teams?.length,
                                    'Aantal leden': club?.players?.length,
                                    'Totaal aantal trainingen':
                                        totalAmountOfTrainings,
                                    'Totaal aantal wedstrijden':
                                        totalAmountOfGames,
                                }}
                            />
                        </Card>
                    </DefaultLoader>
                </GridItem>
                <GridItem colSpan={{ base: 12, xl: 8 }}>
                    <Card bg="primary.500" color="white">
                        <Heading as="h1" size="lg" color="white">
                            Team(s) bij {club?.name}
                        </Heading>

                        <Box overflowX="auto">
                            <TeamTable
                                entries={club?.teams.map((team) => {
                                    return {
                                        name: team?.name,
                                        'Team eigenaar': allWordsCapitalized(
                                            `${team?.owner?.userProfile.firstname} ${team?.owner?.userProfile.lastname}` ||
                                                'Onbekend'
                                        ),
                                        'Aantal spelers': team?.players.length,
                                        'Aantal wedstrijden':
                                            team?.games.length,
                                        'Aantal trainingen':
                                            team?.trainings.length,
                                    };
                                })}
                                isLoading={clubLoading}
                            />
                        </Box>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default ClubPage;
