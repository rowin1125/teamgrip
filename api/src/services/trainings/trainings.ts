import type {
  QueryResolvers,
  MutationResolvers,
  TrainingResolvers,
  CreateScoreInput,
} from 'types/graphql'

import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const trainings: QueryResolvers['trainings'] = () => {
  return db.training.findMany()
}

export const training: QueryResolvers['training'] = ({ id }) => {
  return db.training.findUnique({
    where: { id },
  })
}

export const trainingByTeamId: QueryResolvers['trainingByTeamId'] = ({
  id,
}) => {
  return db.training.findMany({
    where: {
      teamId: id,
    },
    orderBy: {
      trainingsDate: 'desc',
    },
  })
}

export const createTraining: MutationResolvers['createTraining'] = async ({
  input,
  scores,
}) => {
  try {
    const trainingResult = await db.training.create({
      data: {
        ...input,
        players: {
          connect: scores.map((score) => ({
            id: score.playerId,
          })),
        },
      },
    })

    const scoreData: CreateScoreInput[] = scores.map((score) => ({
      ...score,
      trainingId: trainingResult.id,
    }))

    await db.score.createMany({
      data: scoreData,
    })

    return trainingResult
  } catch (error) {
    throw new UserInputError('Failed to upload')
  }
}

export const updateTraining: MutationResolvers['updateTraining'] = ({
  id,
  input,
}) => {
  return db.training.update({
    data: input,
    where: { id },
  })
}

export const deleteTraining: MutationResolvers['deleteTraining'] = ({ id }) => {
  return db.training.delete({
    where: { id },
  })
}

export const Training: TrainingResolvers = {
  season: (_obj, { root }) =>
    db.training.findUnique({ where: { id: root.id } }).season(),
  players: (_obj, { root }) =>
    db.training.findUnique({ where: { id: root.id } }).players(),
  scores: (_obj, { root }) =>
    db.training.findUnique({ where: { id: root.id } }).scores(),
}
