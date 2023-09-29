import type {
    QueryResolvers,
    MutationResolvers,
    ClubRelationResolvers,
} from 'types/graphql';

import { UserInputError } from '@redwoodjs/graphql-server';

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

    if (!club) {
        throw new UserInputError(`Club with id ${id} not found`);
    }

    return club;
};

export const clubSearch: QueryResolvers['clubSearch'] = ({ term }) => {
    if (term.length < 3)
        throw new UserInputError(
            `Search term must be at least 3 characters long`
        );
    return db.club.findMany({
        where: {
            name: {
                contains: term,
                mode: 'insensitive',
            },
        },
    });
};

export const createClub: MutationResolvers['createClub'] = async ({
    input,
}) => {
    const { name } = input;
    const club = await db.club.findFirst({
        where: {
            name: {
                equals: name,
                mode: 'insensitive',
            },
        },
    });

    if (club) {
        throw new UserInputError(`Club with name ${name} already exists`);
    }

    return db.club.create({
        data: input,
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
