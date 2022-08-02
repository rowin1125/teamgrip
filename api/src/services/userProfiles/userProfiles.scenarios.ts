import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserProfileCreateArgs>({
  userProfile: {
    one: { data: { user: { create: { email: 'String533456' } } } },
    two: { data: { user: { create: { email: 'String1097229' } } } },
  },
})

export type StandardScenario = typeof standard
