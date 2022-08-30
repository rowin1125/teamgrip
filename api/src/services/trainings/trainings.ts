import type {
  QueryResolvers,
  MutationResolvers,
  TrainingResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const trainings: QueryResolvers['trainings'] = () => {
  return db.training.findMany()
}

export const training: QueryResolvers['training'] = ({ id }) => {
  return db.training.findUnique({
    where: { id },
  })
}

export const createTraining: MutationResolvers['createTraining'] = ({
  input,
}) => {
  return db.training.create({
    data: input,
  })
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
  score: (_obj, { root }) =>
    db.training.findUnique({ where: { id: root.id } }).scores(),
}
