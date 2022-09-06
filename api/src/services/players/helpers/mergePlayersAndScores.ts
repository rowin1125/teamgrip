import { Prisma } from '@prisma/client'
import { Player } from 'types/graphql'

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
): Player[] => {
  return players.reduce((prev, curr) => {
    const playerTotalScore = scores.find((score) => score.playerId === curr.id)

    if (!playerTotalScore?.playerId) return prev

    const playerWithScore = {
      ...curr,
      totalScore: playerTotalScore?._sum?.points || 0,
    }

    return [...prev, playerWithScore]
  }, [])
}
