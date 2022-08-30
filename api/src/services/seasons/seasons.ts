import type {
  QueryResolvers,
  MutationResolvers,
  SeasonResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const seasons: QueryResolvers['seasons'] = () => {
  return db.season.findMany()
}

export const season: QueryResolvers['season'] = ({ id }) => {
  return db.season.findUnique({
    where: { id },
  })
}

export const createSeason: MutationResolvers['createSeason'] = ({
  input,
  teamId,
}) => {
  return db.season.create({
    data: {
      ...input,
      teamId,
    },
  })
}

export const updateSeason: MutationResolvers['updateSeason'] = ({
  id,
  input,
}) => {
  return db.season.update({
    data: input,
    where: { id },
  })
}

export const deleteSeason: MutationResolvers['deleteSeason'] = ({ id }) => {
  return db.season.delete({
    where: { id },
  })
}

export const Season: SeasonResolvers = {
  trainings: (_obj, { root }) =>
    db.season.findUnique({ where: { id: root.id } }).trainings(),
  score: (_obj, { root }) =>
    db.season.findUnique({ where: { id: root.id } }).scores(),
}
