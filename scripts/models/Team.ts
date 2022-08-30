/* eslint-disable @typescript-eslint/no-explicit-any */
import { randEmail, randFirstName, randLastName } from '@ngneat/falso'
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { generateRandomAvatarOptions } from '../helpers/generateRandomAvatar'

import { defaultUserProperties } from './User'

export const users: Prisma.UserCreateArgs['data'][] = [
  ...Array.from(Array(20).keys()).map<any>(() => ({
    email: randEmail(),
    roles: 'USER',
    avatar: {
      create: {
        avatarStyle: 'Circle',
        ...generateRandomAvatarOptions(),
      },
    },
  })),
]

export const createUsersAndConnectToTeam = async () =>
  Promise.all(
    users.map(async (userData: Prisma.UserCreateArgs['data']) => {
      const firstname = randFirstName()
      const lastname = randLastName()

      try {
        const user = await db.user.create({
          data: {
            ...defaultUserProperties,
            ...userData,
            userProfile: {
              create: {
                firstname,
                lastname,
              },
            },
          },
        })
        const team = await db.team.findFirst({
          where: {
            owner: {
              email: 'rowinmol648@gmail.com',
            },
          },
        })
        const club = await db.club.findFirst()
        await db.player.create({
          data: {
            displayName: `${firstname} ${lastname}`,
            isActivePlayer: true,
            user: {
              connect: {
                id: user.id,
              },
            },
            team: {
              connect: {
                id: team.id,
              },
            },
            club: {
              connect: {
                id: club.id,
              },
            },
          },
        })
      } catch (error) {
        console.log(error)
      }
    })
  )
