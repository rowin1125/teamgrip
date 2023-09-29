/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import { Player } from 'types/graphql';

type ScoreGroupByType = (Prisma.PickArray<
    Prisma.ScoreGroupByOutputType,
    'playerId'[]
> & {
    _sum: {
        points: number | null;
    };
})[];

type MergePlayersAndScoresResponse = Player & {
    totalScore: number;
};

export const mergePlayersAndScores = (
    players: any[],
    scores: ScoreGroupByType
): MergePlayersAndScoresResponse[] => {
    return players.reduce((accPlayerArray, currentPlayer) => {
        const playerTotalScore = scores.find(
            (score) => score.playerId === currentPlayer.id
        );
        if (!playerTotalScore?.playerId)
            return [...accPlayerArray, { ...currentPlayer, totalScore: 0 }];

        const playerWithScore = {
            ...currentPlayer,
            totalScore: playerTotalScore?._sum?.points || 0,
        };

        return [...accPlayerArray, playerWithScore];
    }, []);
};
