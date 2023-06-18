import nanoid from 'nanoid';
import {
  MutationResolvers,
  User as UserType,
  UserRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { mailUser } from 'src/lib/email';

export const activateUserEmail = async ({
  email,
  token,
  ghostInvitation,
}: {
  email: string;
  token: string | null;
  ghostInvitation?: string;
}) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) throw new Error('User not found');

  const encodedEmail = encodeURIComponent(user.email);

  const REDWOOD_ENV_VERCEL_URL =
    process.env.REDWOOD_ENV_VERCEL_URL ?? 'http://localhost:8910';

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
        activateUrl: `${REDWOOD_ENV_VERCEL_URL}/activeren?token=${token}&email=${encodedEmail}${
          ghostInvitation ? `&ghostInvitation=${ghostInvitation}` : ''
        }`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }

  return user;
};

export const activateUser: MutationResolvers['activateUser'] = async ({
  input,
}) => {
  const user = await db.user.findFirst({
    where: { verifiedToken: input.token },
  });

  if (!user) {
    throw new Error('Invalid token');
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      verified: true,
      verifiedToken: null,
    },
  });

  return user;
};

export const resendActivateUser: MutationResolvers['resendActivateUser'] =
  async ({ input }) => {
    let user = await db.user.findFirst({
      where: { email: input.email },
    });
    if (!user) throw new Error('User not found');

    if (!user.verifiedToken) {
      const token = nanoid();
      user = await db.user.update({
        where: { id: user.id },
        data: {
          verifiedToken: token,
        },
      });
    }

    await activateUserEmail({ email: user.email, token: user.verifiedToken });

    return user;
  };

export const forgotPasswordEmail = async ({ user }: { user: UserType }) => {
  const REDWOOD_ENV_VERCEL_URL =
    process.env.REDWOOD_ENV_VERCEL_URL ?? 'http://localhost:8910';
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
        recoverUrl: `${REDWOOD_ENV_VERCEL_URL}/wachtwoord-resetten?resetToken=${user.resetToken}`,
      },
    });
  } catch (error) {
    throw new Error(error);
  }

  return user;
};

export const User: UserRelationResolvers = {
  userProfile: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).userProfile(),
  avatar: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).avatar(),
  player: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).player(),
};
