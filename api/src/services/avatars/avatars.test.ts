import {
  avatars,
  avatar,
  createAvatar,
  updateAvatar,
  deleteAvatar,
} from './avatars';
import type { StandardScenario } from './avatars.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('avatars', () => {
  scenario('returns all avatars', async (scenario: StandardScenario) => {
    const result = await avatars();

    expect(result.length).toEqual(Object.keys(scenario.avatar).length);
  });

  scenario('returns a single avatar', async (scenario: StandardScenario) => {
    const result = await avatar({ id: scenario.avatar.one.id });

    expect(result).toEqual(scenario.avatar.one);
  });

  scenario('creates a avatar', async (scenario: StandardScenario) => {
    const result = await createAvatar({
      input: {
        userId: scenario.avatar.two.userId,
        avatarStyle: 'String',
        topType: 'String',
        accessoriesType: 'String',
        hatColor: 'String',
        hairColor: 'String',
        facialHairType: 'String',
        facialHairColor: 'String',
        clotheType: 'String',
        clotheColor: 'String',
        graphicType: 'String',
        eyeType: 'String',
        eyebrowType: 'String',
        mouthType: 'String',
        skinColor: 'String',
      },
    });

    expect(result.userId).toEqual(scenario.avatar.two.userId);
    expect(result.avatarStyle).toEqual('String');
    expect(result.topType).toEqual('String');
    expect(result.accessoriesType).toEqual('String');
    expect(result.hatColor).toEqual('String');
    expect(result.hairColor).toEqual('String');
    expect(result.facialHairType).toEqual('String');
    expect(result.facialHairColor).toEqual('String');
    expect(result.clotheType).toEqual('String');
    expect(result.clotheColor).toEqual('String');
    expect(result.graphicType).toEqual('String');
    expect(result.eyeType).toEqual('String');
    expect(result.eyebrowType).toEqual('String');
    expect(result.mouthType).toEqual('String');
    expect(result.skinColor).toEqual('String');
  });

  scenario('updates a avatar', async (scenario: StandardScenario) => {
    const original = await avatar({ id: scenario.avatar.one.id });
    const result = await updateAvatar({
      id: original.id,
      input: { avatarStyle: 'String2' },
    });

    expect(result.avatarStyle).toEqual('String2');
  });

  scenario('deletes a avatar', async (scenario: StandardScenario) => {
    const original = await deleteAvatar({ id: scenario.avatar.one.id });
    const result = await avatar({ id: original.id });

    expect(result).toEqual(null);
  });
});
