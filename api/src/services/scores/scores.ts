import type {
  QueryResolvers,
  MutationResolvers,
  ScoreRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const scores: QueryResolvers['scores'] = () => {
  return db.score.findMany()
}

export const score: QueryResolvers['score'] = ({ id }) => {
  return db.score.findUnique({
    where: { id },
  })
}

export const createScore: MutationResolvers['createScore'] = ({ input }) => {
  return db.score.create({
    data: input,
  })
}

export const updateScore: MutationResolvers['updateScore'] = ({
  id,
  input,
}) => {
  return db.score.update({
    data: input,
    where: { id },
  })
}

export const deleteScore: MutationResolvers['deleteScore'] = ({ id }) => {
  return db.score.delete({
    where: { id },
  })
}

export const Score: ScoreRelationResolvers = {
  season: (_obj, { root }) =>
    db.score.findUnique({ where: { id: root.id } }).season(),
  player: (_obj, { root }) =>
    db.score.findUnique({ where: { id: root.id } }).player(),
  training: (_obj, { root }) =>
    db.score.findUnique({ where: { id: root.id } }).training(),
}
