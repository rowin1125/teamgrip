import React from 'react';

import { Heading, Text } from '@chakra-ui/react';

import { routes } from '@redwoodjs/router';

import Card from 'src/components/Card/Card';
import SpinnerLoader from 'src/components/Loaders/SpinnerLoader/SpinnerLoader';
import TeamTable from 'src/components/TeamTable';
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper';
import { allWordsCapitalized } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';
import { useGetPlayersAndScoresByTeamId } from 'src/pages/Team/TeamPage/hooks/useGetPlayersAndScoresByTeamId';

type TopTeamPlayersProps = {
    amount?: number;
    teamId?: string;
};

const TopTeamPlayers = ({ amount = 5, teamId }: TopTeamPlayersProps) => {
    const { playersWithTotalScore, playersWithTotalScoreLoading } =
        useGetPlayersAndScoresByTeamId(amount, teamId);

    return (
        <Card
            w="100%"
            bg="primary.500"
            color="white"
            overflowX="auto"
            h="full"
            minH="700px"
        >
            <SpinnerLoader isLoading={playersWithTotalScoreLoading}>
                <SeasonLockWrapper>
                    {playersWithTotalScore?.length === 0 ? (
                        <>
                            <Heading color="white">
                                Top {amount} van het team{' '}
                            </Heading>
                            <Text>
                                Er zijn nog geen gegevens op te laten zien
                            </Text>
                        </>
                    ) : (
                        <Heading color="white">
                            Top {amount} van het team{' '}
                        </Heading>
                    )}

                    <>
                        <TeamTable
                            size="sm"
                            entries={playersWithTotalScore?.map(
                                (player, index) => ({
                                    Rank: index + 1,
                                    Punten: player?.totalScore,
                                    Naam: allWordsCapitalized(
                                        player?.displayName || 'Onbekend'
                                    ),
                                    Avatar: player?.user?.avatar,
                                    id: player?.id,
                                })
                            )}
                            isLoading={playersWithTotalScoreLoading}
                            hiddenColumns={['id']}
                            routes={{
                                detail: routes.playerDetail,
                            }}
                        />
                    </>
                </SeasonLockWrapper>
            </SpinnerLoader>
        </Card>
    );
};

export default TopTeamPlayers;
