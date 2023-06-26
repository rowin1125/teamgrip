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

import { useAuth } from 'src/auth';
import { routes } from '@redwoodjs/router';

import ChartHasDataWrapper from 'src/components/ValidationWrappers/ChartHasDataWrapper/ChartHasDataWrapper';
import { useScreenSize } from 'src/hooks/global/useScreenSize';
import { allWordsCapitalized } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

type GamePresenceProps = {
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

const GamePresence = ({ teamPresence, isLoading }: GamePresenceProps) => {
  const { isXl, is2xl } = useScreenSize();
  const { currentUser } = useAuth();
  if (!teamPresence) return null;

  const labels = teamPresence.map((player) =>
    allWordsCapitalized(player?.displayName || 'Onbekend')
  );

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Jouw score',
        backgroundColor: '#1f8efa',
        data: teamPresence.map((player) => player?.games.length),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const somePlayerHasGames = teamPresence.some(
    (player) => player?.games && player?.games.length > 0
  );

  return (
    <ChartHasDataWrapper
      hasEntries={somePlayerHasGames}
      isLoading={isLoading}
      to={routes.newGame({
        id: currentUser?.player?.teamId || '',
      })}
      title="Geen gegevens gevonden"
      buttonText="Maak je eerste wedstrijd aan"
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

export default GamePresence;
