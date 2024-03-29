import type {
    QueryResolvers,
    MutationResolvers,
    CreateScoreInput,
    TrainingRelationResolvers,
    CreateActivityPresenceInput,
} from 'types/graphql';

import { UserInputError } from '@redwoodjs/graphql-server';

import { db } from 'src/lib/db';

export const trainings: QueryResolvers['trainings'] = () => {
    return db.training.findMany();
};

export const training: QueryResolvers['training'] = ({ id }) => {
    return db.training.findUnique({
        where: { id },
        include: {
            team: true,
        },
    });
};

export const trainingByTeamId: QueryResolvers['trainingByTeamId'] = async ({
    id,
    limit,
    page,
}) => {
    const offset = (page - 1) * limit;

    const trainings = await db.training.findMany({
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
        trainings,
        total: db.training.count({
            where: {
                teamId: id,
                season: {
                    teamId: id,
                    active: true,
                },
            },
        }),
    };
};

export const getRecentTrainings: QueryResolvers['getRecentTrainings'] = async ({
    playerId,
    limit,
    teamId,
}) => {
    const trainings = await db.training.findMany({
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

    return trainings;
};

export const createTraining: MutationResolvers['createTraining'] = async ({
    input,
    scores,
}) => {
    const team = await db.team.findUnique({
        where: { id: input.teamId },
    });

    if (!team) throw new UserInputError('Team niet gevonden');

    try {
        const trainingResult = await db.training.create({
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
            trainingId: trainingResult.id,
            seasonId: input.seasonId,
            teamId: input.teamId,
            type: 'TRAINING',
        }));

        const activityPresenceData: CreateActivityPresenceInput[] = scores.map(
            (score) => ({
                trainingId: trainingResult.id,
                activityType: 'TRAINING',
                playerId: score?.playerId || '',
                present: true,
                seasonId: input.seasonId,
                teamId: input.teamId,
            })
        );

        const createActivity = db.activityPresence.createMany({
            data: activityPresenceData,
        });

        const createScore = db.score.createMany({
            data: scoreData,
        });

        await db.$transaction([createActivity, createScore]);

        return trainingResult;
    } catch (error) {
        throw new UserInputError('Failed to upload');
    }
};

export const updateTraining: MutationResolvers['updateTraining'] = async ({
    id,
    input,
    scores,
}) => {
    const team = await db.team.findUnique({
        where: { id: input.teamId },
    });

    if (!team) throw new UserInputError('Team niet gevonden');

    const trainingResult = await db.training.update({
        where: { id },
        data: {
            ...input,
            date: new Date(input.date || Date.now()),
            players: {
                connect: scores.map((score) => ({
                    id: score?.playerId ?? '',
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
        trainingId: trainingResult.id,
        seasonId: input.seasonId,
        teamId: input.teamId,
        type: 'TRAINING',
    }));

    const activityPresenceData: CreateActivityPresenceInput[] = scores.map(
        (score) => ({
            trainingId: trainingResult.id,
            activityType: 'TRAINING',
            playerId: score?.playerId || '',
            present: true,
            seasonId: input.seasonId,
            teamId: input.teamId,
        })
    );

    const createActivity = db.activityPresence.createMany({
        data: activityPresenceData,
    });

    const createScore = db.score.createMany({
        data: scoreData,
    });

    await db.$transaction([createActivity, createScore]);

    return trainingResult;
};

export const deleteTraining: MutationResolvers['deleteTraining'] = ({ id }) => {
    return db.training.delete({
        where: { id },
    });
};

export const Training: TrainingRelationResolvers = {
    season: (_obj, { root }) =>
        db.training.findUnique({ where: { id: root.id } }).season(),
    players: (_obj, { root }) =>
        db.training.findUnique({ where: { id: root.id } }).players(),
    scores: (_obj, { root }) =>
        db.training.findUnique({ where: { id: root.id } }).scores(),
    activityPresence: (_obj, { root }) =>
        db.training.findUnique({ where: { id: root.id } }).activityPresence(),
};
