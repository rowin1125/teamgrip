import { randLastName, randFirstName } from '@ngneat/falso'
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { generateRandomAvatarOptions } from '../helpers/generateRandomAvatar'
import { waitFor } from '../seed'

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
    email: 'user-owner-of-team-and-club@example.com',
    roles: 'USER',
    avatar: {
      create: {
        avatarStyle: 'Circle',
        ...generateRandomAvatarOptions(),
      },
    },
  },
  {
    email: 'user-member-of-team-and-club@gmail.com',
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

const createRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const createUsers = async () => {
  Promise.all(
    users.map(async (userData: Prisma.UserCreateArgs['data']) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { avatar, ...userCreateData } = userData
      const firstname = userCreateData.email.includes('rowin')
        ? 'Rowin'
        : randFirstName()
      const lastname = randLastName()
      await db.user
        .create({
          data: {
            ...defaultUserProperties,
            ...userCreateData,
            userProfile: {
              create: {
                firstname,
                lastname,
              },
            },
            player: {
              create: {
                displayName: `${firstname} ${lastname}`,
              },
            },
          },
        })
        .then(async (user) => {
          const club = await db.club.findFirst({
            where: {
              name: 'Zob',
            },
          })

          await db.avatar.create({
            data: {
              ...userData.avatar.create,
              userId: user.id,
            },
          })

          const teamName = `Zaterdag-${createRandomNumber(1, 30)}`

          if (user.email === 'user-member-of-team-and-club@gmail.com') {
            const team = await db.team.findFirst({
              where: {
                owner: {
                  email: 'rowinmol648@gmail.com',
                },
              },
            })
            await waitFor(4000, 'waiting..... ⌛️')

            await db.player.update({
              where: {
                userId: user.id,
              },
              data: {
                isActivePlayer: true,
                team: {
                  connect: {
                    id: team.id,
                  },
                },
              },
            })
            return user
          }

          const team = await db.team.create({
            data: {
              name: teamName,
              ownerId: user.id,
              players: {
                connect: [{ userId: user.id }],
              },
              clubId: club.id,
            },
          })

          await waitFor(2000)

          await db.player.update({
            where: {
              userId: user.id,
            },
            data: {
              playerType: 'STAFF',
              team: {
                connect: {
                  id: team.id,
                },
              },
            },
          })

          return user
        })
    })
  )

  // Create user without Team
  await db.user.create({
    data: {
      ...defaultUserProperties,
      roles: 'USER',
      email: 'user-no-team@gmail.com',
      avatar: {
        create: {
          avatarStyle: 'Circle',
          ...generateRandomAvatarOptions(),
        },
      },
      userProfile: {
        create: {
          firstname: randFirstName(),
          lastname: randLastName(),
        },
      },
      player: {
        create: {},
      },
    },
  })
}
