import React from 'react';

import { Flex, Heading, Button, Box } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Game } from 'types/graphql';

import { routes } from '@redwoodjs/router';

import Card from 'src/components/Card/Card';
import Pagination from 'src/components/Pagination/Pagination';
import RedwoodLink from 'src/components/RedwoodLink';
import TeamTable from 'src/components/TeamTable';
import { allWordsCapitalized } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

import { getBestGamePlayer } from './helpers/getBestGamePlayer';
import { useDeleteGameById } from './hooks/useDeleteGameById';
import { useGetGamesByTeamId } from './hooks/useGetGamesByTeamId';

const TeamGames = () => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const { games, gamesLoading, limit, total } =
        useGetGamesByTeamId(currentPage);
    const { handleDeleteGameById } = useDeleteGameById();
    const { isTeamStaff } = useTeamPlayerAuth();

    const gameEntries = games?.map((game) => {
        const bestPlayer = getBestGamePlayer(game as Game);

        return {
            id: game?.id,
            datum: game?.date ? format(new Date(game.date), 'dd-MM-yyyy') : '',
            aantal: game?.scores.filter((score) => score?.type === 'GAME')
                .length,
            MVP: allWordsCapitalized(bestPlayer?.displayName || 'Onbekend'),
            season: game?.season?.name,
        };
    });

    return (
        <Card>
            <Flex
                justifyContent="space-between"
                flexDirection={{ base: 'column', xl: 'row' }}
            >
                <Heading>Recente wedstrijden</Heading>
                {isTeamStaff && (
                    <Button
                        colorScheme="secondary"
                        as={RedwoodLink}
                        to={routes.newGame()}
                        mt={{ base: 4, xl: 0 }}
                    >
                        Registreer wedstrijd
                    </Button>
                )}
            </Flex>
            <Box overflowX="auto">
                <TeamTable
                    theme="light"
                    size={isTeamStaff ? 'sm' : 'md'}
                    entries={gameEntries}
                    hiddenColumns={['id']}
                    isLoading={gamesLoading}
                    routes={{
                        detail: routes.gameDetail,
                        update: routes.updateGame,
                    }}
                    onDelete={handleDeleteGameById}
                    showActions
                />
            </Box>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={total}
                limit={limit}
            />
        </Card>
    );
};

export default TeamGames;
