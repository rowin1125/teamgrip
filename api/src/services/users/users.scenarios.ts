import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: {
            data: {
                email: 'String8999278',
                hashedPassword: 'String',
                salt: 'String',
            },
        },
        two: {
            data: {
                email: 'String1398737',
                hashedPassword: 'String',
                salt: 'String',
            },
        },
    },
});

export type StandardScenario = typeof standard;
