import {
    seasons,
    season,
    createSeason,
    updateSeason,
    deleteSeason,
} from './seasons';
import type { StandardScenario } from './seasons.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('seasons', () => {
    scenario('returns all seasons', async (scenario: StandardScenario) => {
        const result = await seasons();

        expect(result.length).toEqual(Object.keys(scenario.season).length);
    });

    scenario('returns a single season', async (scenario: StandardScenario) => {
        const result = await season({ id: scenario.season.one.id });

        expect(result).toEqual(scenario.season.one);
    });

    scenario('creates a season', async () => {
        const result = await createSeason({
            input: { name: 'String' },
        });

        expect(result.name).toEqual('String');
    });

    scenario('updates a season', async (scenario: StandardScenario) => {
        const original = await season({ id: scenario.season.one.id });
        const result = await updateSeason({
            id: original.id,
            input: { name: 'String2' },
        });

        expect(result.name).toEqual('String2');
    });

    scenario('deletes a season', async (scenario: StandardScenario) => {
        const original = await deleteSeason({ id: scenario.season.one.id });
        const result = await season({ id: original.id });

        expect(result).toEqual(null);
    });
});
