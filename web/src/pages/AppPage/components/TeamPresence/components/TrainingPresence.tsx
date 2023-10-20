import React from 'react';

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
import { Chart } from 'react-chartjs-2';
import { GetPlayersPresenceQuery } from 'types/graphql';

import { routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import ChartHasDataWrapper from 'src/components/ValidationWrappers/ChartHasDataWrapper/ChartHasDataWrapper';
import { allWordsCapitalized } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';
import { useScreenSize } from 'src/hooks/global/useScreenSize';

type TrainingPresenceProps = {
    teamPresence?: GetPlayersPresenceQuery['getPlayersPresenceByTeamId'];
    isLoading: boolean;
};

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

const TrainingPresence = ({
    teamPresence,
    isLoading,
}: TrainingPresenceProps) => {
    const { isXl, is2xl } = useScreenSize();
    const { currentUser } = useAuth();
    if (!teamPresence) return null;

    const labels = teamPresence?.map((player) =>
        allWordsCapitalized(player?.displayName || 'Onbekend')
    );

    const data = {
        labels,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Score',
                backgroundColor: 'rgb(75, 192, 192)',
                data: teamPresence.map((player) => player?.trainingPresence),
            },
        ],
    };

    const somePlayerHasTrainings = teamPresence.some(
        (player) => player?.trainingPresence && player.trainingPresence > 0
    );

    return (
        <ChartHasDataWrapper
            hasEntries={somePlayerHasTrainings}
            isLoading={isLoading}
            to={routes.newTraining({
                id: currentUser?.player?.teamId || '',
            })}
            title="Geen gegevens gevonden"
            buttonText="Maak je eerste training aan"
        >
            <Chart
                height={is2xl ? 150 : 200}
                type="bar"
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    color: 'white',
                    scales: {
                        x: {
                            ticks: {
                                color: 'white',
                                maxRotation: is2xl ? 50 : 90,
                                minRotation: is2xl ? 40 : 90,
                                font: {
                                    size: isXl ? 12 : 10,
                                },
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
    );
};

export default TrainingPresence;
