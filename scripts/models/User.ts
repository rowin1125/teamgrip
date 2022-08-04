import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { generateRandomAvatarOptions } from '../helpers/generateRandomAvatar'

export const userFixedAvatar: Omit<Prisma.AvatarCreateArgs['data'], 'userId'> =
  {
    avatarStyle: 'Circle',
    topType: 'ShortHairShortFlat',
    accessoriesType: 'Sunglasses',
    hatColor: 'Black',
    hairColor: 'Brown',
    facialHairType: 'BeardLight',
    facialHairColor: 'Brown',
    clotheType: 'Hoodie',
    clotheColor: 'Black',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Tanned',
    graphicType: 'Bat',
  }

export const users: Prisma.UserCreateArgs['data'][] = [
  {
    email: 'rowinmol648@gmail.com',
    roles: 'ADMIN',
    avatar: {
      create: {
        ...userFixedAvatar,
      },
    },
  },
  {
    email: 'alice@example.com',
    roles: 'USER',
    avatar: {
      create: {
        avatarStyle: 'Circle',
        ...generateRandomAvatarOptions(),
      },
    },
  },
  {
    email: 'mark@example.com',
    roles: 'USER',
    avatar: {
      create: {
        avatarStyle: 'Circle',
        ...generateRandomAvatarOptions(),
      },
    },
  },
]

export const defaultUserProperties = {
  hashedPassword:
    '9fd0352cdfa734a293590d891ee176f42bf856f9e0cea82ff574d61a0326c8e5', // 123456
  salt: 'e2803df51c4dfe35f9dc9cb35630e69b',
  verified: true,
}

export const createUsers = async () =>
  Promise.all(
    users.map(async (userData: Prisma.UserCreateArgs['data']) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { avatar, ...userCreateData } = userData
      const record = await db.user
        .create({
          data: {
            ...defaultUserProperties,
            ...userCreateData,
            userProfile: {
              create: {
                firstname: '',
                lastname: '',
              },
            },
          },
        })
        .then(async (user) => {
          await db.avatar.create({
            data: {
              ...userData.avatar.create,
              userId: user.id,
            },
          })
          return user
        })
      console.log(record)
    })
  )
