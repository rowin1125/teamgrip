import type { ActivityPresence } from '@prisma/client';

import {
    activityPresences,
    activityPresence,
    createActivityPresence,
    updateActivityPresence,
    deleteActivityPresence,
} from './activityPresences';
import type { StandardScenario } from './activityPresences.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('activityPresences', () => {
    scenario(
        'returns all activityPresences',
        async (scenario: StandardScenario) => {
            const result = await activityPresences();

            expect(result.length).toEqual(
                Object.keys(scenario.activityPresence).length
            );
        }
    );

    scenario(
        'returns a single activityPresence',
        async (scenario: StandardScenario) => {
            const result = await activityPresence({
                id: scenario.activityPresence.one.id,
            });

            expect(result).toEqual(scenario.activityPresence.one);
        }
    );

    scenario(
        'creates a activityPresence',
        async (scenario: StandardScenario) => {
            const result = await createActivityPresence({
                input: {
                    activityType: 'TRAINING',
                    playerId: scenario.activityPresence.two.playerId,
                    seasonId: scenario.activityPresence.two.seasonId,
                    teamId: scenario.activityPresence.two.teamId,
                    present: scenario.activityPresence.two.present,
                },
            });

            expect(result.activityType).toEqual('TRAINING');
            expect(result.playerId).toEqual(
                scenario.activityPresence.two.playerId
            );
            expect(result.seasonId).toEqual(
                scenario.activityPresence.two.seasonId
            );
        }
    );

    scenario(
        'updates a activityPresence',
        async (scenario: StandardScenario) => {
            const original = (await activityPresence({
                id: scenario.activityPresence.one.id,
            })) as ActivityPresence;
            const result = await updateActivityPresence({
                id: original.id,
                input: { activityType: 'GAME' },
            });

            expect(result.activityType).toEqual('GAME');
        }
    );

    scenario(
        'deletes a activityPresence',
        async (scenario: StandardScenario) => {
            const original = (await deleteActivityPresence({
                id: scenario.activityPresence.one.id,
            })) as ActivityPresence;
            const result = await activityPresence({ id: original.id });

            expect(result).toEqual(null);
        }
    );
});
