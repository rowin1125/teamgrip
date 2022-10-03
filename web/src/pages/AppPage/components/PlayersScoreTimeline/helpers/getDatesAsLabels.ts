import { format } from 'date-fns'
import { GetAllGamesAndTrainingsByTeamId } from 'types/graphql'

export const getDatesAsLabels = (
  allGamesAndTrainings: GetAllGamesAndTrainingsByTeamId['getAllGamesAndTrainingsByTeamId']
) => {
  const allDatesFromGamesAndTrainings: string[] = []
  allGamesAndTrainings?.games.forEach((game) => {
    if (!game?.date) return

    allDatesFromGamesAndTrainings.push(game.date)
  })
  allGamesAndTrainings?.trainings.forEach((training) => {
    if (!training?.date) return

    allDatesFromGamesAndTrainings.push(training.date)
  })

  const labels = new Set<string>()
  labels.add('Start')
  allDatesFromGamesAndTrainings.forEach((date) =>
    labels.add(format(new Date(date), 'dd-MM-yyyy'))
  )

  return labels
}
