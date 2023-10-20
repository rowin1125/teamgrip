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

import { useGetRecentTrainingPoints } from './hooks/useGetRecentTrainingPoints';

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

type PlayerRecentTrainingsType = {
    player?: GetPlayerByIdQuery['player'];
};

const PlayerRecentTrainings = ({ player }: PlayerRecentTrainingsType) => {
    const { recentTrainings, loading } = useGetRecentTrainingPoints(player?.id);
    const { currentUser } = useAuth();
    const { isXl } = useScreenSize();

    const isPublicPlayerPage = !!player?.id;
    const currentPlayerId = player?.id || currentUser?.player?.id;

    const labels = recentTrainings?.map((training) =>
        format(new Date(training.date), 'dd/MM')
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
                data: recentTrainings?.map((training) => {
                    const totalPointsOfCurrentPlayer = training.scores.reduce(
                        (acc, score) => {
                            if (score?.playerId === currentPlayerId)
                                return acc + (score?.points ?? 0);

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
                data: recentTrainings?.map((training) => {
                    const averageTrainingScore =
                        training.scores
                            .map((score) => score?.points ?? 0)
                            .reduce((a, b) => a + b, 0) /
                        training.scores.length;

                    return averageTrainingScore;
                }),
            },
        ],
    };

    const somePlayerHasRecentTrainings = recentTrainings?.some(
        (training) => training.scores.length > 0
    );

    return (
        <Card bg="primary.500" color="white" h="full" minH="300px">
            <SpinnerLoader isLoading={loading}>
                <SeasonLockWrapper>
                    <Heading color="white" mb={8}>
                        Recente punten trainingen
                    </Heading>
                    <ChartHasDataWrapper
                        hasEntries={!!somePlayerHasRecentTrainings}
                        isLoading={loading}
                        to={routes.newTraining({
                            id: currentUser?.player?.teamId || '',
                        })}
                        title="Geen gegevens gevonden"
                        buttonText="Maak je eerste training aan"
                    >
                        <Chart
                            height={isXl ? 400 : 200}
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

export default PlayerRecentTrainings;
