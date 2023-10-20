import React from 'react';

import { Heading } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { format } from 'date-fns';
import { Chart } from 'react-chartjs-2';
import { GetPlayerByIdQuery } from 'types/graphql';

import { routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import Card from 'src/components/Card/Card';
import SpinnerLoader from 'src/components/Loaders/SpinnerLoader/SpinnerLoader';
import ChartHasDataWrapper from 'src/components/ValidationWrappers/ChartHasDataWrapper/ChartHasDataWrapper';
import SeasonLockWrapper from 'src/components/ValidationWrappers/SeasonLockWrapper/SeasonLockWrapper';
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';
import { useScreenSize } from 'src/hooks/global/useScreenSize';

import { useGetRecentGamePoints } from './hooks/useGetRecentGamePoints';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

type PlayerRecentGamesType = {
    player?: GetPlayerByIdQuery['player'];
};

const PlayerRecentGames = ({ player }: PlayerRecentGamesType) => {
    const { recentGames, loading } = useGetRecentGamePoints(player?.id);
    const { currentUser } = useAuth();
    const { isXl } = useScreenSize();

    const isPublicPlayerPage = !!player?.id;
    const currentPlayerId = player?.id || currentUser?.player?.id;

    const labels = recentGames?.map((game) =>
        format(new Date(game.date), 'dd/MM')
    );

    const data = {
        labels,
        datasets: [
            {
                type: 'bar' as const,
                label: isPublicPlayerPage
                    ? `${capitalizeText(player?.displayName || '')}`
                    : 'Jouw score',
                backgroundColor: 'rgb(75, 192, 192)',
                data: recentGames?.map((game) => {
                    const totalPointsOfCurrentPlayer = game.scores.reduce(
                        (acc, score) => {
                            if (score?.playerId === currentPlayerId)
                                return acc + (score?.points || 0);

                            return acc;
                        },
                        0
                    );
                    return totalPointsOfCurrentPlayer;
                }),
            },
            {
                type: 'bar' as const,
                label: 'Gemiddelde score van de groep',
                backgroundColor: 'rgb(53, 162, 235)',
                data: recentGames?.map((game) => {
                    const averageGameScore =
                        game.scores
                            .map((score) => score?.points || 0)
                            .reduce((a, b) => a + b, 0) / game.scores.length;

                    return averageGameScore;
                }),
            },
        ],
    };

    const somePlayerHasRecentGames = recentGames?.some(
        (game) => game.scores.length
    );

    return (
        <Card bg="primary.500" color="white" h="full" minH="300px">
            <SpinnerLoader isLoading={loading}>
                <SeasonLockWrapper>
                    <Heading color="white" mb={8}>
                        Recente punten wedstrijden
                    </Heading>
                    <ChartHasDataWrapper
                        hasEntries={!!somePlayerHasRecentGames}
                        isLoading={loading}
                        to={routes.newGame({
                            id: currentUser?.player?.teamId || '',
                        })}
                        title="Geen gegevens gevonden"
                        buttonText="Maak je eerste wedstrijd aan"
                    >
                        <Chart
                            height={isXl ? 150 : 200}
                            type="bar"
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top' as const,
                                        labels: {
                                            font: {
                                                size: 14,
                                            },
                                            color: 'white',
                                        },
                                    },
                                },
                                color: 'white',
                                scales: {
                                    x: {
                                        ticks: {
                                            color: 'white',
                                            minRotation: 45,
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            color: 'white',
                                        },
                                    },
                                },
                            }}
                            data={data}
                        />
                    </ChartHasDataWrapper>
                </SeasonLockWrapper>
            </SpinnerLoader>
        </Card>
    );
};

export default PlayerRecentGames;
