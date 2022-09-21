import { Prisma } from '@prisma/client'

type ScoreGroupByType = (Prisma.PickArray<
  Prisma.ScoreGroupByOutputType,
  'playerId'[]
> & {
  _sum: {
    points: number
  }
})[]

export const mergePlayersAndScores = (
  players: any,
  scores: ScoreGroupByType
) => {
  return players.reduce((accPlayerArray, currentPlayer) => {
    const playerTotalScore = scores.find(
      (score) => score.playerId === currentPlayer.id
    )
    if (!playerTotalScore?.playerId)
      return [...accPlayerArray, { ...currentPlayer, totalScore: 0 }]

    const playerWithScore = {
      ...currentPlayer,
      totalScore: playerTotalScore?._sum?.points || 0,
    }

    return [...accPlayerArray, playerWithScore]
  }, [])
}
