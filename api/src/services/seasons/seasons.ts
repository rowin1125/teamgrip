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
        const activeSeason = await db.season.findFirst({
            where: {
                teamId: teamId,
                active: true,
            },
        });

        const requestArray = [];

        if (!!activeSeason && input.active) {
            requestArray.push(
                db.season.update({
                    where: { id: activeSeason.id },
                    data: { active: false },
                })
            );
        }

        requestArray.push(
            db.season.create({
                data: {
                    ...input,
                    teamId,
                },
            })
        );

        const [season] = await db.$transaction(requestArray);

        return season;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.code === 'P2002')
            throw new UserInputError('Seizoen bestaat al');
        if (error.message) throw new UserInputError(error.message);
        throw new UserInputError('Er is iets misgegaan');
    }
};

export const updateSeason: MutationResolvers['updateSeason'] = async ({
    id,
    input,
    teamId,
}) => {
    const requestArray = [];

    const activeSeason = await db.season.findFirst({
        where: {
            teamId: teamId,
            active: true,
        },
    });

    if (!!activeSeason && input.active) {
        requestArray.push(
            db.season.update({
                where: { id: activeSeason.id },
                data: { active: false },
            })
        );
    }

    requestArray.push(
        db.season.update({
            data: {
                ...input,
                name: input.name || 'MISSING',
            },
            where: { id },
        })
    );

    const [, season2] = await db.$transaction(requestArray);

    return season2;
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
