import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.AvatarCreateArgs>({
  avatar: {
    one: {
      data: {
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
        user: { create: { email: 'String4136105' } },
      },
    },
    two: {
      data: {
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
        user: { create: { email: 'String9723076' } },
      },
    },
  },
});

export type StandardScenario = typeof standard;
