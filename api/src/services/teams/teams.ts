import nanoid from 'nanoid';
import type {
  QueryResolvers,
  MutationResolvers,
  TeamRelationResolvers,
} from 'types/graphql';

import { context, UserInputError } from '@redwoodjs/graphql-server';

import { db } from 'src/lib/db';

export const teams: QueryResolvers['teams'] = () => {
  return db.team.findMany();
};

export const team: QueryResolvers['team'] = ({ id }) => {
  return db.team.findFirst({
    where: { id },
    include: {
      club: true,
      players: true,
    },
  });
};

export const getAllGamesAndTrainingsByTeamId: QueryResolvers['getAllGamesAndTrainingsByTeamId'] =
  async ({ teamId }) => {
    const team = await db.team.findFirst({
      where: {
        id: teamId,
      },
      include: {
        players: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    });

    const allGames = await db.game.findMany({
      where: {
        teamId,
        season: {
          active: true,
        },
      },
      include: {
        scores: {
          where: {
            season: {
              active: true,
            },
          },
          select: {
            playerId: true,
            trainingId: true,
            points: true,
            gameId: true,
          },
        },
      },
    });

    const allTrainings = await db.training.findMany({
      where: {
        teamId,
        season: {
          active: true,
        },
      },
      include: {
        scores: {
          where: {
            season: {
              active: true,
            },
          },
          select: {
            playerId: true,
            trainingId: true,
            points: true,
            gameId: true,
          },
        },
      },
    });

    const allGamesAndTrainings = {
      players: team?.players,
      games: allGames,
      trainings: allTrainings,
    };

    return allGamesAndTrainings;
  };

export const teamExtraDetails: QueryResolvers['teamExtraDetails'] = ({
  id,
}) => {
  return db.team.findFirst({
    where: { id },
    include: {
      club: true,
      historyPlayers: true,
      players: true,
      games: true,
      trainings: true,
    },
  });
};

export const teamByInvitationToken: QueryResolvers['teamByInvitationToken'] = ({
  invitationToken,
}) => {
  return db.team.findFirst({
    where: {
      invitationToken,
    },
  });
};

export const createTeam: MutationResolvers['createTeam'] = async ({
  input: { ownerIsPlayer, ...input },
}) => {
  try {
    const currentUser = context.currentUser;
    const user = await db.user.findFirst({
      where: {
        id: currentUser?.id,
      },
      include: {
        player: true,
        team: true,
      },
    });

    if (!user?.player) {
      await db.player.create({
        data: {
          userId: currentUser?.id,
        },
      });
    }

    if (user?.team.length)
      throw new UserInputError('Je maakt al deel uit van een Team');

    const createTeam = db.team.create({
      data: {
        ...input,
        players: {
          connect: {
            userId: currentUser?.id,
          },
        },
      },
    });

    const playerUpdate = db.player.update({
      where: {
        userId: currentUser?.id,
      },
      data: {
        isActivePlayer: ownerIsPlayer,
        playerType: 'STAFF',
        club: {
          connect: {
            id: input.clubId,
          },
        },
      },
    });

    const result = await db.$transaction([createTeam, playerUpdate]);

    return result[0];
  } catch (error) {
    if (error.code === 'P2002') throw new UserInputError('Team bestaat al');
    if (error.message) throw new UserInputError(error.message);
    throw new UserInputError('Er is iets misgegaan');
  }
};

export const updateTeam: MutationResolvers['updateTeam'] = async ({
  id,
  input,
}) => {
  try {
    const { ownerIsPlayer, ownerId, ...data } = input;
    const teamResult = await db.team.update({
      data: {
        ...data,
      },
      where: { id },
    });

    await db.player.update({
      where: {
        userId: teamResult.ownerId,
      },
      data: {
        isActivePlayer: ownerIsPlayer,
      },
    });

    return teamResult;
  } catch (error) {
    if (error.code === 'P2002') throw new UserInputError('Team bestaat al');
    if (error.message) throw new UserInputError(error.message);
    throw new UserInputError('Er is iets misgegaan');
  }
};

export const deleteTeam: MutationResolvers['deleteTeam'] = async ({ id }) => {
  await db.player.deleteMany({
    where: {
      teamId: id,
      AND: {
        isGhost: true,
      },
    },
  });

  const deletedTeam = await db.team.delete({
    where: { id },
  });

  await db.player.updateMany({
    where: {
      teamId: id,
    },
    data: {
      teamId: null,
      clubId: null,
    },
  });

  await db.player.update({
    where: {
      userId: context.currentUser.id,
    },
    data: {
      playerType: 'PLAYER',
    },
  });

  return deletedTeam;
};

export const createInvitationToken: MutationResolvers['createInvitationToken'] =
  async ({ id }) => {
    const currentUser = context.currentUser;

    let team = await db.team.findUnique({ where: { id } });
    if (!team) throw new UserInputError(`Geen team gevonden met het id: ${id}`);

    if (currentUser.id !== team.ownerId)
      throw new UserInputError('Je bent niet de eigenaar van het team');

    const invitationToken = nanoid();

    try {
      team = await db.team.update({
        where: { id },
        data: {
          invitationToken,
        },
      });
    } catch (error) {
      throw new Error(error);
    }

    return team;
  };

export const deleteInvitationToken: MutationResolvers['deleteInvitationToken'] =
  async ({ id }) => {
    const currentUser = context.currentUser;

    let team = await db.team.findUnique({ where: { id } });
    if (!team) throw new UserInputError(`Geen team gevonden met het id: ${id}`);

    if (currentUser.id !== team.ownerId)
      throw new UserInputError('Je bent niet de eigenaar van het team');

    try {
      team = await db.team.update({
        where: { id },
        data: {
          invitationToken: null,
        },
      });
    } catch (error) {
      throw new Error(error);
    }

    return team;
  };

export const Team: TeamRelationResolvers = {
  players: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).players(),
  club: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).club(),
  owner: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).owner(),
  season: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).season(),
  trainings: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).trainings(),
  games: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).games(),
};
