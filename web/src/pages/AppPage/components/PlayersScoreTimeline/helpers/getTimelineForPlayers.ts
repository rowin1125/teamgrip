/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns'
import { GetAllGamesAndTrainingsByTeamId } from 'types/graphql'

import { getRandomColor } from './getRandomColor'

type GetTimelineForPlayersProps = {
  labels: Set<string>
  playerTimelineBasedOnDates: Record<string, { date: string; points: number }[]>
  allGamesAndTrainings: GetAllGamesAndTrainingsByTeamId['getAllGamesAndTrainingsByTeamId']
}

export const getTimelineForPlayers = ({
  labels: labelsSet,
  playerTimelineBasedOnDates,
  allGamesAndTrainings,
}: GetTimelineForPlayersProps) => {
  let highestScore = 0
  const labels = Array.from(labelsSet)

  const data = {
    labels: labels,
    datasets: Object.keys(playerTimelineBasedOnDates).map((player) => {
      const values = playerTimelineBasedOnDates[player]

      const playerName = allGamesAndTrainings?.players.find(
        (p) => p?.id === player
      )?.displayName

      const randomColor = getRandomColor()

      const totalPointsForEachData: { date: string; points: number }[] =
        values.reduce<any>((acc, curr) => {
          const existing = acc.find((item: any) => item.date === curr.date)
          if (existing) {
            existing.points += curr.points
          } else {
            acc.push({ date: curr.date, points: curr.points })
          }
          return acc
        }, [])

      const scoreTimeline = [{ date: 'Start', points: 0 }]

      for (const pt of totalPointsForEachData) {
        const newPoints =
          scoreTimeline[scoreTimeline.length - 1].points + pt.points
        if (newPoints > highestScore) {
          highestScore = newPoints
        }
        const date = format(new Date(pt.date), 'dd-MM-yyyy')
        scoreTimeline.push({ date: date, points: newPoints })
      }

      if (scoreTimeline.length < labels.length) {
        const missingDates = labels.filter((label) => {
          if (label === 'Start') return false

          return !scoreTimeline.find((st) => {
            if (st.date === 'Start') return false
            return st.date === label
          })
        })

        missingDates.forEach((date) => {
          const positionInArrayBasedOnDate = labels.indexOf(date)

          const points = scoreTimeline[positionInArrayBasedOnDate - 1].points
          scoreTimeline.splice(positionInArrayBasedOnDate, 0, {
            date,
            points,
          })
        })
      }

      return {
        type: 'line' as const,
        label: playerName,
        backgroundColor: randomColor,
        data: scoreTimeline.map((tl) => tl.points),
        borderColor: randomColor,
        borderWidth: 2,
      }
    }),
  }

  return {
    data,
    highestScore,
  }
}
