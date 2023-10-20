import { Flex, Grid, GridItem, Heading } from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';

import PlayerCard from 'src/components/PlayerCard/PlayerCard';

import PlayerRecentGames from '../AppPage/components/PlayerRecentGames';
import PlayerRecentTrainings from '../AppPage/components/PlayerRecentTrainings';
import PlayersScoreTimeline from '../AppPage/components/PlayersScoreTimeline';
import TeamPresence from '../AppPage/components/TeamPresence';
import TopTeamPlayers from '../AppPage/components/TopTeamPlayers';

import { useGetPlayerById } from './hooks/useGetPlayerById';

const PlayerDetailPage = () => {
    const { id } = useParams();
    const { player, loading } = useGetPlayerById({ id });

    if (!player && !loading) return null;

    return (
        <>
            <MetaTags
                title={`${player?.displayName} details`}
                description={`Overzicht van alle gegevens van ${player?.displayName}`}
            />

            <Grid
                templateColumns="repeat(12, 1fr)"
                templateRows="repeat(1, 1fr)"
                gap={{ base: 0, xl: 10 }}
                rowGap={{ base: 10 }}
            >
                <GridItem colSpan={{ base: 12 }}>
                    <Heading as="h1" size="2xl" color="white">
                        Dashboard speler
                    </Heading>
                </GridItem>
                {player?.isActivePlayer && (
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
                {player?.teamId && (
                    <>
                        <GridItem
                            colSpan={{ base: 12, xl: 6 }}
                            rowSpan={1}
                            order={{ base: 10, xl: 'unset' }}
                        >
                            <TopTeamPlayers
                                amount={10}
                                teamId={player?.teamId}
                            />
                        </GridItem>
                        {player.isActivePlayer && (
                            <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
                                <PlayerRecentTrainings player={player} />
                            </GridItem>
                        )}

                        {player.isActivePlayer && (
                            <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
                                <PlayerRecentGames player={player} />
                            </GridItem>
                        )}
                        <TeamPresence player={player} />
                    </>
                )}
            </Grid>
        </>
    );
};

export default PlayerDetailPage;
