import type { Prisma } from '@prisma/client';
import { db } from 'api/src/lib/db';

export const createScores = async (season: Prisma.SeasonCreateArgs['data']) => {
    const user = await db.user.findFirst({
        where: {
            email: 'rowinmol648@gmail.com',
        },
        include: {
            team: true,
            player: true,
        },
    });

    if (!user) throw new Error('Scores: No user found');

    const trainings = Promise.all(
        [...Array(25).keys()].map(async (i) => {
            const date = new Date();
            const newDate = date.setDate(date.getDate() + i);

            await db.training.create({
                data: {
                    date: new Date(newDate),
                    season: {
                        connect: {
                            id: season.id,
                        },
                    },
                    team: {
                        connect: {
                            id: user.player?.teamId || '',
                        },
                    },

                    players: {
                        connect: {
                            id: user.player?.id,
                        },
                    },
                    scores: {
                        create: {
                            season: {
                                connect: {
                                    id: season.id,
                                },
                            },
                            player: {
                                connect: {
                                    id: user.player?.id,
                                },
                            },
                            points: i + 1,
                            type: 'TRAINING',
                            team: {
                                connect: {
                                    id: user.player?.teamId || '',
                                },
                            },
                        },
                    },
                },
            });
        })
    );

    const games = Promise.all(
        [...Array(25).keys()].map(async (i) => {
            const date = new Date();
            const newDate = date.setDate(date.getDate() + i);

            await db.game.create({
                data: {
                    date: new Date(newDate),
                    season: {
                        connect: {
                            id: season.id,
                        },
                    },
                    team: {
                        connect: {
                            id: user.team[0].id,
                        },
                    },

                    players: {
                        connect: {
                            id: user.player?.id,
                        },
                    },
                    scores: {
                        create: {
                            season: {
                                connect: {
                                    id: season.id,
                                },
                            },
                            player: {
                                connect: {
                                    id: user.player?.id,
                                },
                            },
                            points: i + 1,
                            type: 'GAME',
                            team: {
                                connect: {
                                    id: user.team[0].id,
                                },
                            },
                        },
                    },
                },
            });
        })
    );

    return {
        trainings,
        games,
    };
};
