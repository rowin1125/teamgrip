import type {
    QueryResolvers,
    MutationResolvers,
    ActivityPresenceRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const activityPresences: QueryResolvers['activityPresences'] = () => {
    return db.activityPresence.findMany();
};

export const activityPresence: QueryResolvers['activityPresence'] = ({
    id,
}) => {
    return db.activityPresence.findUnique({
        where: { id },
    });
};

export const createActivityPresence: MutationResolvers['createActivityPresence'] =
    ({ input }) => {
        return db.activityPresence.create({
            data: input,
        });
    };

export const updateActivityPresence: MutationResolvers['updateActivityPresence'] =
    ({ id, input }) => {
        return db.activityPresence.update({
            data: input,
            where: { id },
        });
    };

export const deleteActivityPresence: MutationResolvers['deleteActivityPresence'] =
    ({ id }) => {
        return db.activityPresence.delete({
            where: { id },
        });
    };

export const ActivityPresence: ActivityPresenceRelationResolvers = {
    player: (_obj, { root }) => {
        return db.activityPresence
            .findUnique({ where: { id: root?.id } })
            .player();
    },
    season: (_obj, { root }) => {
        return db.activityPresence
            .findUnique({ where: { id: root?.id } })
            .season();
    },
    team: (_obj, { root }) => {
        return db.activityPresence
            .findUnique({ where: { id: root?.id } })
            .team();
    },
    game: (_obj, { root }) => {
        return db.activityPresence
            .findUnique({ where: { id: root?.id } })
            .game();
    },
    training: (_obj, { root }) => {
        return db.activityPresence
            .findUnique({ where: { id: root?.id } })
            .training();
    },
};
