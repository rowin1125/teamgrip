import type { PrismaClient } from '@prisma/client';

export default async ({ db }: { db: PrismaClient }) => {
    const allGames = await db.game.findMany({
        include: {
            scores: {
                include: {
                    player: true,
                },
            },
            activityPresence: true,
        },
    });
    if (typeof allGames[0].activityPresence === 'undefined') {
        console.error('🚨 -> Activity is not yet migrated');
        return;
    }

    allGames.forEach(async (game) => {
        game.scores.forEach(async (score) => {
            if (score.type !== 'GAME') return;

            const activityPresence = await db.activityPresence.findFirst({
                where: {
                    playerId: score.playerId,
                    gameId: game.id,
                },
            });

            if (activityPresence) return;

            await db.activityPresence.create({
                data: {
                    playerId: score.playerId,
                    gameId: game.id,
                    activityType: 'GAME',
                    seasonId: game.seasonId || '',
                    teamId: game.teamId,
                    present: true,
                },
            });
        });
    });

    const allTrainings = await db.training.findMany({
        include: {
            scores: {
                include: {
                    player: true,
                },
            },
        },
    });

    allTrainings.forEach(async (training) => {
        training.scores.forEach(async (score) => {
            if (score.type !== 'TRAINING') return;

            const activityPresence = await db.activityPresence.findFirst({
                where: {
                    playerId: score.playerId,
                    trainingId: training.id,
                },
            });

            if (activityPresence) return;

            await db.activityPresence.create({
                data: {
                    playerId: score.playerId,
                    trainingId: training.id,
                    activityType: 'TRAINING',
                    seasonId: training.seasonId || '',
                    teamId: training.teamId,
                    present: true,
                },
            });
        });
    });
};
