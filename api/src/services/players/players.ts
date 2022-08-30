import nanoid from 'nanoid'
import type {
  QueryResolvers,
  MutationResolvers,
  PlayerResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

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
    // TODO: In the future migrate over the Scores from ghost to user
    // const ghostPlayer = await db.player.findUnique({ where: { id: ghostId } })
    const team = await db.team.findUnique({ where: { id: teamId } })

    const deleteGhostPlayer = db.player.delete({
      where: { id: ghostId },
    })

    const updatePlayerWithGhostData = db.player.update({
      where: { id },
      data: {
        clubId: team.clubId,
        teamId,
        isActivePlayer: true,
        ghostInvitation: null,
        isGhost: false,
      },
    })

    const updatePlayersResult = await db.$transaction([
      deleteGhostPlayer,
      updatePlayerWithGhostData,
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
