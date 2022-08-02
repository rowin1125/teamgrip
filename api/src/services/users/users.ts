import nanoid from 'nanoid'
import { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

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

  const subject = 'TeamStats - Aanmelding'
  const encodedEmail = encodeURIComponent(user.email)
  console.log('encodedEmail', encodedEmail)

  const html =
    'This is a manually triggered test email.<br><br>' +
    'It was sent from a RedwoodJS application.<br><br>' +
    `<a href="http://localhost:8910/activate?token=${token}&email=${encodedEmail}">Activeer je account</a>`

  try {
    await sendEmail({ to: user.email, subject, html })
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
