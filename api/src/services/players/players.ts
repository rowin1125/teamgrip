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
