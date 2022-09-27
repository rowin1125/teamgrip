import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TrainingCreateArgs>({
  training: {
    one: { data: { date: '2022-08-30T15:45:02Z' } },
    two: { data: { date: '2022-08-30T15:45:02Z' } },
  },
})

export type StandardScenario = typeof standard
