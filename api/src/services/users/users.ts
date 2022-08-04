import nanoid from 'nanoid'
import { MutationResolvers, User } from 'types/graphql'

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

  const html =
    'Welkom bij de TeamStats famile<br><br>' +
    'Laten we direct van start gaan!<br><br>' +
    `<a href="http://localhost:8910/activeren?token=${token}&email=${encodedEmail}">Activeer je account</a>`

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

export const forgotPasswordEmail = async ({ user }: { user: User }) => {
  const subject = 'TeamStats - Wachtwoord vergeten'

  const html =
    'Oeps je bent je wachtwoord vergeten ...<br><br>' +
    'Maak je niet druk, druk op de link en je kan hem weer gewoon resetten.<br><br>' +
    `<a href="http://localhost:8910/wachtwoord-resetten?resetToken=${user.resetToken}">Reset je wachtwoord</a>`

  try {
    await sendEmail({ to: user.email, subject, html })
  } catch (error) {
    throw new Error(error.message)
  }

  return user
}
