import { GetAllGamesAndTrainingsByTeamId } from 'types/graphql'

type PlayerTimelineBasedOnDatesType = Record<
  string,
  { date: string; points: number }[]
>

export const getPlayerTimelineBasedOnDates = (
  allGamesAndTrainings: GetAllGamesAndTrainingsByTeamId['getAllGamesAndTrainingsByTeamId']
) => {
  if (!allGamesAndTrainings?.games || !allGamesAndTrainings?.trainings)
    return {
      gamesAndTrainingArray: [],
      playerTimelineBasedOnDates: {},
    }

  const playerTimelineBasedOnDates: PlayerTimelineBasedOnDatesType = {}
  const gamesAndTrainingArray = [
    ...allGamesAndTrainings.games,
    ...allGamesAndTrainings.trainings,
  ]

  for (const gameOrTraining of gamesAndTrainingArray) {
    gameOrTraining?.scores.forEach((score) => {
      if (!score?.playerId) return
      if (!playerTimelineBasedOnDates[score.playerId]) {
        playerTimelineBasedOnDates[score.playerId] = [
          {
            date: gameOrTraining.date,
            points: score.points,
          },
        ]
      } else {
        playerTimelineBasedOnDates[score.playerId].push({
          date: gameOrTraining.date,
          points: score.points,
        })
      }
    })
  }

  return {
    playerTimelineBasedOnDates,
    gamesAndTrainingArray,
  }
}
