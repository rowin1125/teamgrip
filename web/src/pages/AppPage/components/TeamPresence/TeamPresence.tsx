import React from 'react';

import { Box, GridItem, Heading } from '@chakra-ui/react';
import { GetPlayerByIdQuery } from 'types/graphql';

import Card from 'src/components/Card/Card';
import SpinnerLoader from 'src/components/Loaders/SpinnerLoader/SpinnerLoader';
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper';

import GamePresence from './components/GamePresence';
import TrainingPresence from './components/TrainingPresence';
import { useGetPlayersPresence } from './hooks/useGetTeamPresenceByTeamId';

type TeamPresenceType = {
    player?: GetPlayerByIdQuery['player'];
};

const TeamPresence = ({ player }: TeamPresenceType) => {
    const { teamPresence, teamPresenceLoading } = useGetPlayersPresence(
        player?.teamId
    );

    return (
        <>
            <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
                <Card bg="primary.500" color="white" h="full" minH="300px">
                    <SpinnerLoader isLoading={teamPresenceLoading}>
                        <Heading color="white">Training aanwezigheid</Heading>

                        <Box mt={8}>
                            <SeasonLockWrapper>
                                <TrainingPresence
                                    teamPresence={teamPresence}
                                    isLoading={teamPresenceLoading}
                                />
                            </SeasonLockWrapper>
                        </Box>
                    </SpinnerLoader>
                </Card>
            </GridItem>
            <GridItem colSpan={{ base: 12, xl: 6 }} rowSpan={1}>
                <Card
                    bg="primary.500"
                    color="white"
                    h="full"
                    mt={{ xl: 0 }}
                    minH="300px"
                >
                    <SpinnerLoader isLoading={teamPresenceLoading}>
                        <Heading color="white">Wedstrijd aanwezigheid</Heading>

                        <Box mt={{ xl: 8 }}>
                            <SeasonLockWrapper>
                                <GamePresence
                                    teamPresence={teamPresence}
                                    isLoading={teamPresenceLoading}
                                />
                            </SeasonLockWrapper>
                        </Box>
                    </SpinnerLoader>
                </Card>
            </GridItem>
        </>
    );
};

export default TeamPresence;
