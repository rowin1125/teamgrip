import React, { useMemo } from 'react'

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
import { GetAllGamesAndTrainingsByTeamId } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import ChartHasDataWrapper from 'src/components/ValidationWrappers/ChartHasDataWrapper/ChartHasDataWrapper'
import { useScreenSize } from 'src/hooks/global/useScreenSize'

import { getDatesAsLabels } from '../helpers/getDatesAsLabels'
import { getPlayerTimelineBasedOnDates } from '../helpers/getPlayerTimelineBasedOnDates'
import { getTimelineForPlayers } from '../helpers/getTimelineForPlayers'

type ScoreTimelineProps = {
  allGamesAndTrainings: GetAllGamesAndTrainingsByTeamId['getAllGamesAndTrainingsByTeamId']
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

const ScoreTimeline = ({
  allGamesAndTrainings,
  isLoading,
}: ScoreTimelineProps) => {
  const { currentUser } = useAuth()
  const { isXl, is2xl } = useScreenSize()

  const labels = useMemo(
    () => getDatesAsLabels(allGamesAndTrainings),
    [allGamesAndTrainings]
  )
  const { gamesAndTrainingArray, playerTimelineBasedOnDates } =
    getPlayerTimelineBasedOnDates(allGamesAndTrainings)

  const { data, highestScore } = getTimelineForPlayers({
    labels,
    playerTimelineBasedOnDates,
    allGamesAndTrainings,
  })

  const somePlayerHasScores = gamesAndTrainingArray.some((gameOrTraining) =>
    gameOrTraining.scores.some((score) => score.points > 0)
  )

  return (
    <ChartHasDataWrapper
      hasEntries={somePlayerHasScores}
      isLoading={isLoading}
      to={routes.newTraining({
        id: currentUser?.player.teamId,
      })}
      title="Geen gegevens gevonden"
      buttonText="Maak je eerste training aan"
    >
      <Chart
        height={is2xl ? 100 : 300}
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
                maxRotation: is2xl ? 50 : 90,
                minRotation: is2xl ? 40 : 90,
                font: {
                  size: isXl ? 12 : 10,
                },
              },
            },
            leftY: {
              min: 0,
              max: Math.round(highestScore + highestScore / 10),
              position: 'left',
              ticks: {
                color: 'white',
              },
            },
            rightY: {
              min: 0,
              max: Math.round(highestScore + highestScore / 10),
              position: 'right',
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

export default ScoreTimeline
