import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PlayerCreateArgs>({
  player: {
    one: { data: { user: { create: { email: 'String8999327' } } } },
    two: { data: { user: { create: { email: 'String7781439' } } } },
  },
})

export type StandardScenario = typeof standard
