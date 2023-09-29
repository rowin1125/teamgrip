import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react';

import { MetaTags } from '@redwoodjs/web';

import PlayerCard from 'src/components/PlayerCard/PlayerCard';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

import TeamNotFoundMessage from '../Team/TeamPage/components/TeamNotFoundMessage';

import PlayerRecentGames from './components/PlayerRecentGames';
import PlayerRecentTrainings from './components/PlayerRecentTrainings';
import PlayersScoreTimeline from './components/PlayersScoreTimeline';
import TeamPresence from './components/TeamPresence';
import TopTeamPlayers from './components/TopTeamPlayers';

const AppPage = () => {
    const { team, loading } = useGetTeamById();
    const { isActivePlayer } = useTeamPlayerAuth();

    if (!team?.id && !loading)
        return (
            <>
                <MetaTags
                    title="Dashboard"
                    description="Dashboard overzicht van jouw gegevens binnen het team"
                />
                <TeamNotFoundMessage title="Mijn Dashboard" />
            </>
        );

    return (
        <>
            <MetaTags
                title="Dashboard"
                description="Dashboard overzicht van jouw gegevens binnen het team"
            />

            <Grid
                templateColumns="repeat(12, 1fr)"
                templateRows="repeat(1, 1fr)"
                gap={{ base: 0, xl: 10 }}
                rowGap={{ base: 10 }}
            >
                <GridItem colSpan={{ base: 12 }}>
                    <Heading as="h1" size="2xl" color="white">
                        Jouw dashboard
                    </Heading>
                    {team && (
                        <Heading as="h1" size="lg" color="white" mt={4}>
                            {team?.club?.name} - {team.name}
                        </Heading>
                    )}
                </GridItem>

                {isActivePlayer && (
                    <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
                        <Flex
                            justifyContent="center"
                            w="full"
                            alignItems="center"
                            h="full"
                        >
                            <PlayerCard />
                        </Flex>
                    </GridItem>
                )}
                <PlayersScoreTimeline />
                <GridItem
                    colSpan={{ base: 12, xl: 6 }}
                    rowSpan={1}
                    order={{ base: 10, xl: 'unset' }}
                >
                    <TopTeamPlayers amount={10} />
                </GridItem>
                {isActivePlayer && (
                    <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
                        <PlayerRecentTrainings />
                    </GridItem>
                )}

                {isActivePlayer && (
                    <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
                        <PlayerRecentGames />
                    </GridItem>
                )}
                <TeamPresence />
            </Grid>
        </>
    );
};

export default AppPage;
