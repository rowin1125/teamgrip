import nanoid from 'nanoid'
import type {
  QueryResolvers,
  MutationResolvers,
  PlayerResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { mergePlayersAndScores } from './helpers/mergePlayersAndScores'

export const players: QueryResolvers['players'] = () => {
  return db.player.findMany()
}

export const playersForTeam: QueryResolvers['playersForTeam'] = async ({
  teamId,
}) => {
  return await db.player.findMany({
    where: {
      teamId,
      AND: {
        isActivePlayer: true,
      },
    },
    include: {
      scores: true,
      user: {
        include: {
          userProfile: {
            select: {
              firstname: true,
              lastname: true,
            },
          },
          avatar: true,
        },
      },
    },
  })
}

export const getPlayersAndScoresByTeamId: QueryResolvers['getPlayersAndScoresByTeamId'] =
  async ({ teamId, limit }) => {
    const playersWithoutScores = await db.player.findMany({
      where: {
        teamId,
        AND: {
          isActivePlayer: true,
        },
      },
      include: {
        user: {
          include: {
            avatar: true,
          },
        },
      },
    })

    const scores = await db.score.groupBy({
      by: ['playerId'],
      _sum: {
        points: true,
      },
      orderBy: {
        _sum: {
          points: 'asc',
        },
      },
      where: {
        teamId,
        season: {
          active: true,
        },
      },
    })
    const players = mergePlayersAndScores(playersWithoutScores, scores)
    const sortedPLayers = players.sort((a, b) => b.totalScore - a.totalScore)

    if (limit) return sortedPLayers.slice(0, limit)

    return sortedPLayers
  }

export const getPlayerScoresByTeamId: QueryResolvers['getPlayerScoresByTeamId'] =
  async ({ teamId }) => {
    const playerWithoutScores = await db.player.findFirst({
      where: {
        teamId,
        id: context.currentUser.player.id,
      },
      include: {
        scores: {
          where: {
            playerId: context.currentUser.player.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    })
    const activeSeason = await db.season.findFirst({
      where: {
        active: true,
        teamId,
      },
    })

    const score = await db.score.aggregate({
      _sum: {
        points: true,
      },
      _avg: {
        points: true,
      },
      where: {
        season: {
          active: true,
        },
        playerId: context.currentUser.player.id,
      },
    })

    const playerWithScore = {
      ...playerWithoutScores,
      totalScore: score?._sum?.points ?? 0,
      avgScore: score?._avg?.points ?? 0,
      activeSeason,
    }

    return playerWithScore
  }

export const getPlayersPresenceByTeamId: QueryResolvers['getPlayersPresenceByTeamId'] =
  async ({ teamId }) => {
    const players = await db.player.findMany({
      where: {
        teamId,
        AND: {
          isActivePlayer: true,
        },
      },
      include: {
        trainings: {
          where: {
            season: {
              active: true,
            },
          },
        },
        games: {
          where: {
            season: {
              active: true,
            },
          },
        },
      },
    })

    return players
  }

export const getGhostPlayersByTeamId: QueryResolvers['getGhostPlayersByTeamId'] =
  async ({ teamId }) => {
    return db.player.findMany({
      where: {
        teamId,
        isGhost: true,
      },
    })
  }

export const getGhostPlayerByInvitation: QueryResolvers['getGhostPlayerByInvitation'] =
  async ({ ghostInvitation }) => {
    return db.player.findFirst({
      where: {
        ghostInvitation,
        isGhost: true,
      },
    })
  }

export const player: QueryResolvers['player'] = ({ id }) => {
  return db.player.findUnique({
    where: { id },
  })
}

export const createPlayer: MutationResolvers['createPlayer'] = ({ input }) => {
  return db.player.create({
    data: input,
  })
}

export const createManyGhostPlayers: MutationResolvers['createManyGhostPlayers'] =
  async ({ input }) => {
    const playersData = input.players.map((player) => ({
      displayName: player.displayName,
      teamId: input.teamId,
      isActivePlayer: true,
      isGhost: true,
    }))
    const players = await db.player.createMany({
      data: playersData,
      skipDuplicates: true,
    })

    return players
  }

export const createGhostPlayerInvitation: MutationResolvers['createGhostPlayerInvitation'] =
  async ({ id }) => {
    const token = nanoid()

    return db.player.update({
      where: {
        id,
      },
      data: {
        ghostInvitation: token,
      },
    })
  }

export const deleteGhostPlayerInvitation: MutationResolvers['deleteGhostPlayerInvitation'] =
  async ({ id }) => {
    return db.player.update({
      where: {
        id,
      },
      data: {
        ghostInvitation: null,
      },
    })
  }

export const playerJoinsTeamByGhostInvitation: MutationResolvers['playerJoinsTeamByGhostInvitation'] =
  async ({ id, ghostId, teamId }) => {
    const currentPlayer = await db.player.findUnique({ where: { id: id } })
    const team = await db.team.findUnique({ where: { id: teamId } })

    const deleteCurrentPlayerFromUser = db.player.delete({
      where: {
        id,
      },
    })

    const newCurrentUserPlayer = db.player.update({
      where: { id: ghostId },
      data: {
        user: {
          connect: {
            id: context.currentUser.id,
          },
        },

        club: {
          connect: {
            id: team.clubId,
          },
        },
        isActivePlayer: true,
        teamInvitation: null,
        ghostInvitation: null,
        displayName: currentPlayer.displayName,
        isGhost: false,
      },
    })

    const updatePlayersResult = await db.$transaction([
      deleteCurrentPlayerFromUser,
      newCurrentUserPlayer,
    ])

    return updatePlayersResult[1]
  }

export const updatePlayer: MutationResolvers['updatePlayer'] = ({
  id,
  input,
}) => {
  return db.player.update({
    data: input,
    where: { id },
  })
}

export const deletePlayer: MutationResolvers['deletePlayer'] = ({ id }) => {
  return db.player.delete({
    where: { id },
  })
}

export const Player: PlayerResolvers = {
  user: (_obj, { root }) =>
    db.player.findUnique({ where: { id: root.id } }).user(),
  team: (_obj, { root }) =>
    db.player.findUnique({ where: { id: root.id } }).team(),
  club: (_obj, { root }) =>
    db.player.findUnique({ where: { id: root.id } }).club(),
}
