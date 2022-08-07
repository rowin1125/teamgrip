import nanoid from 'nanoid'
import { MutationResolvers, User } from 'types/graphql'

import { db } from 'src/lib/db'
import { mailUser } from 'src/lib/email'

export const activateUserEmail = async ({
  email,
  token,
}: {
  email: string
  token: string | null
}) => {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (!user) throw new Error('User not found')

  const encodedEmail = encodeURIComponent(user.email)

  try {
    await mailUser({
      to: [
        {
          name: encodedEmail,
          email: user.email,
        },
      ],
      templateId: 1,
      params: {
        activateUrl: `${process.env.FRONTEND_URL}/activeren?token=${token}&email=${encodedEmail}`,
        firstname: 'test',
      },
    })
    // await sendEmail({ to: user.email, subject, html })
  } catch (error) {
    throw new Error(error.message)
  }

  return user
}

export const activateUser: MutationResolvers['activateUser'] = async ({
  input,
}) => {
  const user = await db.user.findFirst({
    where: { verifiedToken: input.token },
  })

  if (!user) {
    throw new Error('Invalid token')
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      verified: true,
      verifiedToken: null,
    },
  })

  return user
}

export const resendActivateUser: MutationResolvers['resendActivateUser'] =
  async ({ input }) => {
    let user = await db.user.findFirst({
      where: { email: input.email },
    })
    if (!user) throw new Error('User not found')

    if (!user.verifiedToken) {
      const token = nanoid()
      user = await db.user.update({
        where: { id: user.id },
        data: {
          verifiedToken: token,
        },
      })
    }

    await activateUserEmail({ email: user.email, token: user.verifiedToken })

    return user
  }

export const forgotPasswordEmail = async ({ user }: { user: User }) => {
  try {
    await mailUser({
      to: [
        {
          name: user.email,
          email: user.email,
        },
      ],
      templateId: 2,
      params: {
        recoverUrl: `${process.env.FRONTEND_URL}/wachtwoord-resetten?resetToken=${user.resetToken}`,
      },
    })
  } catch (error) {
    throw new Error(error.message)
  }

  return user
}
