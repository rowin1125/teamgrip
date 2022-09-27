import {
  trainings,
  training,
  createTraining,
  updateTraining,
  deleteTraining,
} from './trainings'
import type { StandardScenario } from './trainings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('trainings', () => {
  scenario('returns all trainings', async (scenario: StandardScenario) => {
    const result = await trainings()

    expect(result.length).toEqual(Object.keys(scenario.training).length)
  })

  scenario('returns a single training', async (scenario: StandardScenario) => {
    const result = await training({ id: scenario.training.one.id })

    expect(result).toEqual(scenario.training.one)
  })

  scenario('creates a training', async () => {
    const result = await createTraining({
      input: { date: '2022-08-30T15:45:02Z' },
    })

    expect(result.date).toEqual('2022-08-30T15:45:02Z')
  })

  scenario('updates a training', async (scenario: StandardScenario) => {
    const original = await training({ id: scenario.training.one.id })
    const result = await updateTraining({
      id: original.id,
      input: { date: '2022-08-31T15:45:02Z' },
    })

    expect(result.date).toEqual('2022-08-31T15:45:02Z')
  })

  scenario('deletes a training', async (scenario: StandardScenario) => {
    const original = await deleteTraining({ id: scenario.training.one.id })
    const result = await training({ id: original.id })

    expect(result).toEqual(null)
  })
})
