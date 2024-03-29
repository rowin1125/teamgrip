import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

import DefaultLoader from 'src/components/Loaders/DefaultLoader/DefaultLoader';
import TextAlert from 'src/components/TextAlert/TextAlert';

import TeamHistoryPlayersTable from './components/TeamHistoryPlayersTable';
import { useGetHistoryPlayersByTeamId } from './hooks/useGetHistoryPlayersByTeamId';

const TeamHistoryPlayersSettings = () => {
    const { historyPlayersData, historyPlayersLoading } =
        useGetHistoryPlayersByTeamId();

    const transformedTeamPlayers = historyPlayersData?.map((player) => ({
        id: player?.id,
        naam: player?.displayName,
    }));

    return (
        <Box>
            <Heading as="h2" size="lg" mt={8}>
                Historische spelers
            </Heading>
            <TextAlert status="info" my={8}>
                <Text>
                    Hieronder vind je een overzicht van alle spelers die deel
                    uit hebben gemaakt van jouw team. Je hebt deze spelers op
                    een zeker moment vewijderd uit jouw team. Deze spelers zijn
                    niet meer actief in jouw team, maar zijn wel nog steeds
                    actief op de website om de tussenstanden tijdens het seizoen
                    goed te laten zien.
                </Text>
                <br />
                <Text>
                    Speler kunnen wederom uitgenodigd worden voor jouw team. Dit
                    kan via de onderstaande link. Het is niet mogelijk om
                    ghostspelers opnieuw aan spelers te koppelen.
                </Text>
            </TextAlert>
            <DefaultLoader minH="200px" isLoading={historyPlayersLoading}>
                <Box w={{ base: '100%', xl: '600px' }}>
                    <TeamHistoryPlayersTable entries={transformedTeamPlayers} />
                </Box>
            </DefaultLoader>
        </Box>
    );
};

export default TeamHistoryPlayersSettings;
