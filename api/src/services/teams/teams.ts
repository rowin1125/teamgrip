import type {
  QueryResolvers,
  MutationResolvers,
  TeamResolvers,
} from 'types/graphql'

import { context } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const teams: QueryResolvers['teams'] = () => {
  return db.team.findMany()
}

export const team: QueryResolvers['team'] = ({ id }) => {
  return db.team.findFirst({
    where: { id },
    include: {
      club: true,
    },
  })
}

export const createTeam: MutationResolvers['createTeam'] = async ({
  input: { ownerIsPlayer, ...input },
}) => {
  const currentUser = context.currentUser
  const playerAlreadyPartOfTeam = await db.team.findFirst({
    where: {
      players: {
        some: {
          userId: currentUser.id,
        },
      },
    },
  })

  if (playerAlreadyPartOfTeam) throw Error('Je maakt al deel uit van een Team')

  const createTeam = db.team.create({
    data: {
      ...input,
      players: {
        connect: {
          userId: currentUser.id,
        },
      },
    },
  })

  const playerUpdate = db.player.update({
    where: {
      userId: currentUser.id,
    },
    data: {
      isActivePlayer: ownerIsPlayer,
    },
  })

  const result = await db.$transaction([createTeam, playerUpdate])

  return result[0]
}

export const updateTeam: MutationResolvers['updateTeam'] = ({ id, input }) => {
  return db.team.update({
    data: input,
    where: { id },
  })
}

export const deleteTeam: MutationResolvers['deleteTeam'] = ({ id }) => {
  return db.team.delete({
    where: { id },
  })
}

export const Team: TeamResolvers = {
  players: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).players(),
  club: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).club(),
  owner: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).owner(),
}
