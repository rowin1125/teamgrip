import type {
  QueryResolvers,
  MutationResolvers,
  SeasonRelationResolvers,
} from 'types/graphql';

import { UserInputError } from '@redwoodjs/graphql-server';

import { db } from 'src/lib/db';

export const seasons: QueryResolvers['seasons'] = () => {
  return db.season.findMany();
};

export const season: QueryResolvers['season'] = ({ id }) => {
  return db.season.findUnique({
    where: { id },
  });
};

export const seasonsByTeamId: QueryResolvers['seasonsByTeamId'] = ({
  teamId,
}) => {
  return db.season.findMany({
    where: { teamId },
    include: {
      trainings: {
        select: {
          id: true,
        },
      },
      games: {
        select: {
          id: true,
        },
      },
      scores: {
        select: {
          id: true,
        },
      },
    },
  });
};

export const createSeason: MutationResolvers['createSeason'] = async ({
  input,
  teamId,
}) => {
  try {
    const seasonActive = await db.season.findFirst({
      where: {
        teamId,
        active: true,
      },
    });

    if (seasonActive && input.active) {
      throw new UserInputError('Er is al een actief seizoen');
    }

    const season = await db.season.create({
      data: {
        ...input,
        teamId,
      },
    });
    return season;
  } catch (error) {
    if (error.code === 'P2002') throw new UserInputError('Seizoen bestaat al');
    if (error.message) throw new UserInputError(error.message);
    throw new UserInputError('Er is iets misgegaan');
  }
};

export const updateSeason: MutationResolvers['updateSeason'] = async ({
  id,
  input,
  teamId,
}) => {
  const seasonActive = await db.season.findFirst({
    where: {
      teamId: teamId,
      active: true,
    },
  });

  if (seasonActive && seasonActive.id !== id && input.active) {
    throw new UserInputError('Er is al een actief seizoen');
  }
  return db.season.update({
    data: input,
    where: { id },
  });
};

export const deleteSeason: MutationResolvers['deleteSeason'] = async ({
  id,
}) => {
  try {
    const deleteSeason = db.season.delete({
      where: { id },
    });
    const deleteScoresForSeason = db.score.deleteMany({
      where: { seasonId: id },
    });

    const [, deleteSeasonRes] = await db.$transaction([
      deleteScoresForSeason,
      deleteSeason,
    ]);

    return deleteSeasonRes;
  } catch (error) {
    console.log(error);
    throw new UserInputError('Er is iets misgegaan');
  }
};

export const Season: SeasonRelationResolvers = {
  trainings: (_obj, { root }) =>
    db.season.findUnique({ where: { id: root.id } }).trainings(),
  scores: (_obj, { root }) =>
    db.season.findUnique({ where: { id: root.id } }).scores(),
};
