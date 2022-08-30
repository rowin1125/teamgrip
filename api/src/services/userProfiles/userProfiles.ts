import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const userProfiles: QueryResolvers['userProfiles'] = () => {
  return db.userProfile.findMany()
}

export const userProfile: QueryResolvers['userProfile'] = ({ id }) => {
  return db.userProfile.findUnique({
    where: { id },
  })
}

export const createUserProfile: MutationResolvers['createUserProfile'] = ({
  input,
}) => {
  return db.userProfile.create({
    data: input,
  })
}

export const updateUserProfile: MutationResolvers['updateUserProfile'] =
  async ({ id, input }) => {
    const userProfile = await db.userProfile.update({
      where: { userId: id },
      data: input,
    })

    await db.player.update({
      where: {
        userId: id,
      },
      data: {
        displayName: `${userProfile.firstname} ${userProfile.lastname}`,
      },
    })

    return userProfile
  }

export const deleteUserProfile: MutationResolvers['deleteUserProfile'] = ({
  id,
}) => {
  return db.userProfile.delete({
    where: { id },
  })
}

// Might be nice for in the future to fetched the user based on the profile id
// export const UserProfile: UserProfileResolvers = {
//   user: (_obj, { root }) =>
//     db.userProfile.findUnique({ where: { id: root.id } }).user(),
// }
