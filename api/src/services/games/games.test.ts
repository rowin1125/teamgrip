import { games, game, createGame, updateGame, deleteGame } from './games'
import type { StandardScenario } from './games.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('games', () => {
  scenario('returns all games', async (scenario: StandardScenario) => {
    const result = await games()

    expect(result.length).toEqual(Object.keys(scenario.game).length)
  })

  scenario('returns a single game', async (scenario: StandardScenario) => {
    const result = await game({ id: scenario.game.one.id })

    expect(result).toEqual(scenario.game.one)
  })

  scenario('creates a game', async (scenario: StandardScenario) => {
    const result = await createGame({
      input: {
        date: '2022-09-12T18:09:40Z',
        teamId: scenario.game.two.teamId,
      },
    })

    expect(result.date).toEqual('2022-09-12T18:09:40Z')
    expect(result.teamId).toEqual(scenario.game.two.teamId)
  })

  scenario('updates a game', async (scenario: StandardScenario) => {
    const original = await game({ id: scenario.game.one.id })
    const result = await updateGame({
      id: original.id,
      input: { date: '2022-09-13T18:09:40Z' },
    })

    expect(result.date).toEqual('2022-09-13T18:09:40Z')
  })

  scenario('deletes a game', async (scenario: StandardScenario) => {
    const original = await deleteGame({ id: scenario.game.one.id })
    const result = await game({ id: original.id })

    expect(result).toEqual(null)
  })
})
