import nanoid from 'nanoid';
import type {
    QueryResolvers,
    MutationResolvers,
    PlayerRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { db } from 'src/lib/db';

import { mergePlayersAndScores } from './helpers/mergePlayersAndScores';

export const players: QueryResolvers['players'] = () => {
    return db.player.findMany();
};

export const playersForTeam: QueryResolvers['playersForTeam'] = async ({
    teamId,
}) => {
    const activeSeason = await db.season.findFirst({
        where: {
            active: true,
            teamId,
        },
    });

    return db.player.findMany({
        where: {
            OR: [
                {
                    teamId,
                },
                {
                    historySeasons: {
                        some: {
                            id: activeSeason?.id,
                        },
                    },
                },
            ],
            AND: {
                isActivePlayer: true,
            },
        },
        include: {
            scores: true,
            user: {
                include: {
                    userProfile: {
                        select: {
                            firstname: true,
                            lastname: true,
                        },
                    },
                    avatar: true,
                },
            },
        },
    });
};

export const getPlayersAndScoresByTeamId: QueryResolvers['getPlayersAndScoresByTeamId'] =
    async ({ teamId, limit }) => {
        const activeSeason = await db.season.findFirst({
            where: {
                active: true,
                teamId,
            },
        });

        const playersWithoutScores = await db.player.findMany({
            where: {
                OR: [
                    {
                        teamId,
                    },
                    {
                        historySeasons: {
                            some: {
                                id: activeSeason?.id,
                            },
                        },
                    },
                ],
                AND: {
                    isActivePlayer: true,
                },
            },
            include: {
                user: {
                    include: {
                        avatar: true,
                    },
                },
            },
        });

        const scores = await db.score.groupBy({
            by: ['playerId'],
            _sum: {
                points: true,
            },
            orderBy: {
                _sum: {
                    points: 'asc',
                },
            },
            where: {
                teamId,
                player: {
                    isActivePlayer: true,
                },
                season: {
                    active: true,
                },
            },
        });
        const players = mergePlayersAndScores(playersWithoutScores, scores);
        const sortedPLayers = players?.sort(
            (a, b) => b.totalScore - a.totalScore
        );

        if (limit) return sortedPLayers.slice(0, limit);

        return sortedPLayers;
    };

export const getPlayerScoresByTeamId: QueryResolvers['getPlayerScoresByTeamId'] =
    async ({ teamId, playerId }) => {
        const searchPlayerId = playerId || context.currentUser?.player?.id;

        const playerWithoutScores = await db.player.findFirst({
            where: {
                teamId,
                id: searchPlayerId,
            },
            include: {
                scores: {
                    where: {
                        playerId: searchPlayerId,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
            },
        });
        const activeSeason = await db.season.findFirst({
            where: {
                active: true,
                teamId,
            },
        });

        const score = await db.score.aggregate({
            _sum: {
                points: true,
            },
            _avg: {
                points: true,
            },
            where: {
                season: {
                    active: true,
                },
                playerId: searchPlayerId,
            },
        });

        const playerWithScore = {
            ...playerWithoutScores,
            totalScore: score?._sum?.points ?? 0,
            avgScore: score?._avg?.points ?? 0,
            activeSeason,
        };

        return playerWithScore;
    };

export const getPlayersPresenceByTeamId: QueryResolvers['getPlayersPresenceByTeamId'] =
    async ({ teamId }) => {
        const activeSeason = await db.season.findFirst({
            where: {
                active: true,
                teamId,
            },
        });

        const players = await db.player.findMany({
            where: {
                OR: [
                    {
                        teamId,
                    },
                    {
                        historySeasons: {
                            some: {
                                id: activeSeason?.id,
                            },
                        },
                    },
                ],
                AND: {
                    isActivePlayer: true,
                },
            },
            include: {
                activityPresence: {
                    where: {
                        seasonId: activeSeason?.id,
                        teamId: teamId,
                    },
                },
                trainings: {
                    where: {
                        season: {
                            active: true,
                        },
                    },
                },
                games: {
                    where: {
                        season: {
                            active: true,
                        },
                    },
                },
            },
        });

        return players;
    };

export const getGhostPlayersByTeamId: QueryResolvers['getGhostPlayersByTeamId'] =
    async ({ teamId }) => {
        return db.player.findMany({
            where: {
                teamId,
                isGhost: true,
            },
        });
    };

export const getGhostPlayerByInvitation: QueryResolvers['getGhostPlayerByInvitation'] =
    async ({ ghostInvitation }) => {
        return db.player.findFirst({
            where: {
                ghostInvitation,
                isGhost: true,
            },
        });
    };

export const player: QueryResolvers['player'] = ({ id }) => {
    return db.player.findUnique({
        where: { id },
    });
};

export const getHistoryPlayersByTeamId: QueryResolvers['getHistoryPlayersByTeamId'] =
    async ({ teamId }) => {
        return db.player.findMany({
            where: {
                historyTeams: {
                    some: {
                        id: teamId,
                    },
                },
            },
        });
    };

export const createPlayer: MutationResolvers['createPlayer'] = ({ input }) => {
    return db.player.create({
        data: removeNulls(input),
    });
};

export const createManyGhostPlayers: MutationResolvers['createManyGhostPlayers'] =
    async ({ input }) => {
        const playersData = input.players.map((player) => ({
            displayName: player?.displayName,
            teamId: input.teamId,
            isActivePlayer: true,
            isGhost: true,
        }));
        const players = await db.player.createMany({
            data: playersData,
            skipDuplicates: true,
        });

        return players;
    };

export const createGhostPlayerInvitation: MutationResolvers['createGhostPlayerInvitation'] =
    async ({ id }) => {
        const token = nanoid();

        return db.player.update({
            where: {
                id,
            },
            data: {
                ghostInvitation: token,
            },
        });
    };

export const deleteGhostPlayerInvitation: MutationResolvers['deleteGhostPlayerInvitation'] =
    async ({ id }) => {
        return db.player.update({
            where: {
                id,
            },
            data: {
                ghostInvitation: null,
            },
        });
    };

export const playerJoinsTeamByGhostInvitation: MutationResolvers['playerJoinsTeamByGhostInvitation'] =
    async ({ id, ghostId, teamId }) => {
        const currentPlayer = await db.player.findUnique({ where: { id: id } });
        const currentUser = context?.currentUser;
        const team = await db.team.findUnique({ where: { id: teamId } });

        if (!team?.clubId || !currentUser)
            throw new Error('Player or team not found');

        if (currentPlayer) {
            await db.player.delete({
                where: {
                    id,
                },
            });
        }

        const newCurrentUserPlayer = await db.player.update({
            where: { id: ghostId },
            data: {
                user: {
                    connect: {
                        id: currentUser?.id,
                    },
                },
                club: {
                    connect: {
                        id: team.clubId,
                    },
                },
                isActivePlayer: true,
                teamInvitation: null,
                ghostInvitation: null,
                displayName:
                    currentPlayer?.displayName ||
                    `${currentUser.userProfile?.firstname} ${currentUser.userProfile?.lastname}`,
                isGhost: false,
            },
        });

        return newCurrentUserPlayer;
    };

export const updatePlayer: MutationResolvers['updatePlayer'] = ({
    id,
    input,
}) => {
    return db.player.update({
        data: removeNulls(input),
        where: { id },
    });
};

export const rejoinTeamFromHistory: MutationResolvers['rejoinTeamFromHistory'] =
    async ({ id, teamId }) => {
        const activeSeasonForTeam = await db.season.findFirst({
            where: {
                active: true,
                teamId,
            },
        });

        const player = await db.player.findUnique({
            where: {
                id,
            },
            include: {
                historySeasons: true,
                team: true,
                historyTeams: true,
            },
        });

        if (player?.team?.id)
            throw new UserInputError('Player is already in a team');

        const playerHistorySeasonIsEqualToActiveTeamSeason =
            player?.historySeasons?.some(
                (season) => season.id === activeSeasonForTeam?.id
            );

        const removeHistorySeasonDataInput =
            playerHistorySeasonIsEqualToActiveTeamSeason
                ? {
                      historySeasons: {
                          disconnect: {
                              id: activeSeasonForTeam?.id,
                          },
                      },
                  }
                : null;

        const updatedPlayer = await db.player.update({
            where: {
                id,
            },
            data: {
                ...removeHistorySeasonDataInput,
                isActivePlayer: true,
                teamInvitation: null,
                historyTeams: {
                    disconnect: {
                        id: teamId,
                    },
                },
                team: {
                    connect: {
                        id: teamId,
                    },
                },
            },
        });

        return updatedPlayer;
    };

export const deletePlayer: MutationResolvers['deletePlayer'] = async ({
    id,
}) => {
    const player = await db.player.findUnique({
        where: { id },
        include: {
            team: {
                include: {
                    season: {
                        where: {
                            active: true,
                        },
                    },
                },
            },
        },
    });

    if (player?.isGhost) {
        await db.player.delete({
            where: { id },
        });
        return player;
    }

    if (!player || !player.teamId) throw new UserInputError('Player not found');

    await db.team.update({
        where: { id: player.teamId },
        data: {
            players: {
                update: {
                    where: {
                        id: player.id,
                    },
                    data: {
                        playerType: 'PLAYER',
                        historySeasons: {
                            connect: {
                                id: player.team?.season?.[0]?.id,
                            },
                        },
                        club: {
                            disconnect: true,
                        },
                    },
                },
                disconnect: {
                    id: player.id,
                },
            },
            historyPlayers: {
                connect: {
                    id: player.id,
                },
            },
        },
    });

    return player;
};

export const Player: PlayerRelationResolvers = {
    user: (_obj, { root }) =>
        db.player.findUnique({ where: { id: root.id } }).user(),
    team: (_obj, { root }) =>
        db.player.findUnique({ where: { id: root.id } }).team(),
    club: (_obj, { root }) =>
        db.player.findUnique({ where: { id: root.id } }).club(),
    scores: (_obj, { root }) =>
        db.player.findUnique({ where: { id: root.id } }).scores(),
    activityPresence: ({ type }, { root }) => {
        return db.player
            .findUnique({ where: { id: root.id } })
            .activityPresence({
                where: {
                    activityType: type || undefined,
                    teamId: root.teamId || undefined,
                },
            });
    },
    activityPresenceCount: async ({ type }, { root }) => {
        const res = await db.player
            .findUnique({ where: { id: root.id } })
            .activityPresence({
                where: {
                    activityType: type || undefined,
                    teamId: root.teamId || undefined,
                },
            });

        return res?.length || 0;
    },
};
