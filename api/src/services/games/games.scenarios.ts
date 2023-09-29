import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.GameCreateArgs>({
    game: {
        one: {
            data: {
                date: '2022-09-12T18:09:40Z',
                team: {
                    create: {
                        name: 'String7009538',
                        owner: { create: { email: 'String1047657' } },
                    },
                },
            },
        },
        two: {
            data: {
                date: '2022-09-12T18:09:40Z',
                team: {
                    create: {
                        name: 'String3945779',
                        owner: { create: { email: 'String4157915' } },
                    },
                },
            },
        },
    },
});

export type StandardScenario = typeof standard;
