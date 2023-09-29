import type {
    QueryResolvers,
    MutationResolvers,
    AvatarRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { db } from 'src/lib/db';

export const avatars: QueryResolvers['avatars'] = () => {
    return db.avatar.findMany();
};

export const avatar: QueryResolvers['avatar'] = ({ id }) => {
    return db.avatar.findUnique({
        where: { id },
    });
};

export const createAvatar: MutationResolvers['createAvatar'] = ({ input }) => {
    return db.avatar.create({
        data: input,
    });
};

export const updateAvatar: MutationResolvers['updateAvatar'] = async ({
    id,
    input,
}) => {
    const currentAvatar = await db.avatar.findUnique({ where: { id } });

    if (!currentAvatar) {
        return db.avatar.create({
            data: {
                ...removeNulls(input),
                user: {
                    connect: {
                        id: context.currentUser?.id || '',
                    },
                },
            },
        });
    }
    return db.avatar.update({
        data: removeNulls(input),
        where: { id },
    });
};

export const deleteAvatar: MutationResolvers['deleteAvatar'] = ({ id }) => {
    return db.avatar.delete({
        where: { id },
    });
};

export const Avatar: AvatarRelationResolvers = {
    user: (_obj, { root }) =>
        db.avatar.findUnique({ where: { id: root.id } }).user(),
};
