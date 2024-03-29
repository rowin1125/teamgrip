import type {
    QueryResolvers,
    MutationResolvers,
    CreateScoreInput,
    GameRelationResolvers,
    CreateActivityPresenceInput,
} from 'types/graphql';

import { UserInputError } from '@redwoodjs/graphql-server';

import { db } from 'src/lib/db';

export const games: QueryResolvers['games'] = () => {
    return db.game.findMany();
};

export const game: QueryResolvers['game'] = async ({ id }) => {
    const game = await db.game.findUnique({
        where: { id },
    });

    return game;
};

export const gamesByTeamId: QueryResolvers['gamesByTeamId'] = async ({
    id,
    limit,
    page,
}) => {
    const offset = (page - 1) * limit;

    const games = await db.game.findMany({
        take: limit,
        skip: offset,
        where: {
            teamId: id,
            season: {
                active: true,
            },
        },
        orderBy: {
            date: 'desc',
        },
    });

    return {
        games,
        total: db.game.count({
            where: {
                teamId: id,
                season: {
                    active: true,
                },
            },
        }),
    };
};

export const getRecentGames: QueryResolvers['getRecentGames'] = async ({
    playerId,
    limit,
    teamId,
}) => {
    const games = await db.game.findMany({
        where: {
            teamId,
            players: {
                some: {
                    id: playerId,
                },
            },
            season: {
                active: true,
            },
        },
        include: {
            scores: true,
        },
        orderBy: {
            date: 'desc',
        },
        take: limit,
    });

    return games;
};

export const createGame: MutationResolvers['createGame'] = async ({
    input,
    scores,
}) => {
    try {
        const gameResult = await db.game.create({
            data: {
                ...input,
                players: {
                    connect: scores.map((score) => ({
                        id: score?.playerId,
                    })),
                },
            },
        });

        const scoreData: CreateScoreInput[] = scores.map((score) => ({
            ...score,
            playerId: score?.playerId || '',
            points: score?.points || 0,
            gameId: gameResult.id,
            seasonId: input.seasonId,
            teamId: input.teamId,
            type: 'GAME',
        }));

        const activityPresenceData: CreateActivityPresenceInput[] = scores.map(
            (score) => ({
                gameId: gameResult.id,
                activityType: 'GAME',
                playerId: score?.playerId || '',
                present: true,
                seasonId: input.seasonId,
                teamId: input.teamId,
            })
        );

        await db.activityPresence.createMany({
            data: activityPresenceData,
        });

        await db.score.createMany({
            data: scoreData,
        });

        return gameResult;
    } catch (error) {
        throw new UserInputError('Failed to upload');
    }
};

export const updateGame: MutationResolvers['updateGame'] = async ({
    id,
    input,
    scores,
}) => {
    const team = await db.team.findUnique({
        where: { id: input.teamId },
    });

    if (!team) throw new UserInputError('Team niet gevonden');

    try {
        const gameResult = await db.game.update({
            where: { id },
            data: {
                ...input,
                players: {
                    connect: scores.map((score) => ({
                        id: score?.playerId,
                    })),
                },
                scores: {
                    deleteMany: {},
                },
                activityPresence: {
                    deleteMany: {},
                },
            },
        });

        const scoreData: CreateScoreInput[] = scores.map((score) => ({
            ...score,
            playerId: score?.playerId || '',
            points: score?.points || 0,
            gameId: gameResult.id,
            seasonId: input.seasonId,
            teamId: input.teamId,
            type: 'GAME',
        }));

        const activityPresenceData: CreateActivityPresenceInput[] = scores.map(
            (score) => ({
                gameId: gameResult.id,
                activityType: 'GAME',
                playerId: score?.playerId || '',
                present: true,
                seasonId: input.seasonId,
                teamId: input.teamId,
            })
        );

        await db.activityPresence.createMany({
            data: activityPresenceData,
        });

        await db.score.createMany({
            data: scoreData,
        });

        return gameResult;
    } catch (error) {
        throw new UserInputError('Failed to upload');
    }
};

export const deleteGame: MutationResolvers['deleteGame'] = ({ id }) => {
    return db.game.delete({
        where: { id },
    });
};

export const Game: GameRelationResolvers = {
    season: (_obj, { root }) =>
        db.game.findUnique({ where: { id: root.id } }).season(),
    players: (_obj, { root }) =>
        db.game.findUnique({ where: { id: root.id } }).players(),
    scores: (_obj, { root }) =>
        db.game.findUnique({ where: { id: root.id } }).scores(),
    team: (_obj, { root }) =>
        db.game.findUnique({ where: { id: root.id } }).team(),
    activityPresence: (_obj, { root }) =>
        db.game.findUnique({ where: { id: root.id } }).activityPresence(),
};
