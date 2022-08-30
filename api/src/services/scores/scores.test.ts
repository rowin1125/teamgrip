import { scores, score, createScore, updateScore, deleteScore } from './scores'
import type { StandardScenario } from './scores.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('scores', () => {
  scenario('returns all scores', async (scenario: StandardScenario) => {
    const result = await scores()

    expect(result.length).toEqual(Object.keys(scenario.score).length)
  })

  scenario('returns a single score', async (scenario: StandardScenario) => {
    const result = await score({ id: scenario.score.one.id })

    expect(result).toEqual(scenario.score.one)
  })

  scenario('creates a score', async (scenario: StandardScenario) => {
    const result = await createScore({
      input: {
        score: 5091267,
        type: 'TRAINING',
        seasonId: scenario.score.two.seasonId,
        playerId: scenario.score.two.playerId,
        trainingId: scenario.score.two.trainingId,
      },
    })

    expect(result.score).toEqual(5091267)
    expect(result.type).toEqual('TRAINING')
    expect(result.seasonId).toEqual(scenario.score.two.seasonId)
    expect(result.playerId).toEqual(scenario.score.two.playerId)
    expect(result.trainingId).toEqual(scenario.score.two.trainingId)
  })

  scenario('updates a score', async (scenario: StandardScenario) => {
    const original = await score({ id: scenario.score.one.id })
    const result = await updateScore({
      id: original.id,
      input: { score: 2233648 },
    })

    expect(result.score).toEqual(2233648)
  })

  scenario('deletes a score', async (scenario: StandardScenario) => {
    const original = await deleteScore({ id: scenario.score.one.id })
    const result = await score({ id: original.id })

    expect(result).toEqual(null)
  })
})
