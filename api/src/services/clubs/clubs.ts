import type {
  QueryResolvers,
  MutationResolvers,
  ClubRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const clubs: QueryResolvers['clubs'] = () => {
  return db.club.findMany();
};

export const club: QueryResolvers['club'] = async ({ id }) => {
  const club = await db.club.findUnique({
    where: { id },
    include: {
      teams: {
        include: {
          season: true,
          trainings: true,
          games: true,
        },
      },
    },
  });

  return club;
};

export const createClub: MutationResolvers['createClub'] = ({ input }) => {
  return db.club.create({
    data: input,
  });
};

export const updateClub: MutationResolvers['updateClub'] = ({ id, input }) => {
  return db.club.update({
    data: input,
    where: { id },
  });
};

export const deleteClub: MutationResolvers['deleteClub'] = ({ id }) => {
  return db.club.delete({
    where: { id },
  });
};

export const Club: ClubRelationResolvers = {
  teams: (_obj, { root }) =>
    db.club.findUnique({ where: { id: root.id } }).teams(),
  players: (_obj, { root }) =>
    db.club.findUnique({ where: { id: root.id } }).players(),
};
