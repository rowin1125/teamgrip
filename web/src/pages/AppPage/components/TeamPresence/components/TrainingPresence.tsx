import React from 'react'

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
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { GetPlayersPresenceQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import ChartHasDataWrapper from 'src/components/ValidationWrappers/ChartHasDataWrapper/ChartHasDataWrapper'
import { useScreenSize } from 'src/hooks/global/useScreenSize'

type TrainingPresenceProps = {
  teamPresence: GetPlayersPresenceQuery['getPlayersPresenceByTeamId']
  isLoading: boolean
}

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
)

const TrainingPresence = ({
  teamPresence,
  isLoading,
}: TrainingPresenceProps) => {
  const { isXl } = useScreenSize()
  const { currentUser } = useAuth()
  if (!teamPresence) return null

  const labels = teamPresence.map((player) => player.displayName)

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Jouw score',
        backgroundColor: 'rgb(75, 192, 192)',
        data: teamPresence.map((player) => player.trainings.length),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  }

  const somePlayerHasTrainings = teamPresence.some(
    (player) => player.trainings.length > 0
  )

  return (
    <ChartHasDataWrapper
      hasEntries={somePlayerHasTrainings}
      isLoading={isLoading}
      to={routes.newTraining({
        id: currentUser?.player.teamId,
      })}
      title="Geen gegevens gevonden"
      buttonText="Maak je eerste training aan"
    >
      <Chart
        height={isXl ? 100 : 200}
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
                maxRotation: 90,
                minRotation: 90,
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
  )
}

export default TrainingPresence
