import type { Prisma, ActivityPresence } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ActivityPresenceCreateArgs>({
    activityPresence: {
        one: {
            data: {
                activityType: 'TRAINING',
                player: { create: {} },
                team: {
                    connect: {
                        id: 'String',
                    },
                },
                season: {
                    create: {
                        name: 'String',
                        seasonTeamName: 'String3881811',
                        team: {
                            create: {
                                name: 'String',
                                owner: { create: { email: 'String7575676' } },
                            },
                        },
                    },
                },
            },
        },
        two: {
            data: {
                activityType: 'TRAINING',
                player: { create: {} },
                team: {
                    connect: {
                        id: 'String',
                    },
                },
                season: {
                    create: {
                        name: 'String',
                        seasonTeamName: 'String7343270',
                        team: {
                            create: {
                                name: 'String',
                                owner: { create: { email: 'String1728502' } },
                            },
                        },
                    },
                },
            },
        },
    },
});

export type StandardScenario = ScenarioData<
    ActivityPresence,
    'activityPresence'
>;
