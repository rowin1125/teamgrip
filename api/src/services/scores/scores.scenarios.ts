import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ScoreCreateArgs>({
  score: {
    one: {
      data: {
        score: 8936704,
        type: 'TRAINING',
        season: { create: { name: 'String' } },
        player: { create: {} },
        training: { create: { trainingsDate: '2022-08-30T15:45:10Z' } },
      },
    },
    two: {
      data: {
        score: 4131403,
        type: 'TRAINING',
        season: { create: { name: 'String' } },
        player: { create: {} },
        training: { create: { trainingsDate: '2022-08-30T15:45:10Z' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
