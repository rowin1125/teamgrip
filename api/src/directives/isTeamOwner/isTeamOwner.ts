import {
  createValidatorDirective,
  UserInputError,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server';

import { db } from 'src/lib/db';

export const schema = gql`
  """
  Use @isTeamOwner to validate access to a field, query or mutation.
  """
  directive @isTeamOwner on FIELD_DEFINITION
`;

const validate: ValidatorDirectiveFunc = async ({ context }) => {
  if (!context.currentUser) {
    throw new UserInputError(
      '(Owner): Geen gebruiker gevonden bij authenticatie 👮‍♂️'
    );
  }
  if (!context.currentUser?.player?.teamId) {
    throw new UserInputError(
      '(Owner): Geen team gevonden bij authenticatie 👮‍♂️'
    );
  }
  const team = await db.team.findUnique({
    where: { id: context.currentUser.player.teamId },
  });

  const isAdmin = context.currentUser?.roles === 'ADMIN';
  if (isAdmin) return;

  if (!team) throw new UserInputError('Team niet gevonden');
  if (team.ownerId !== context.currentUser.id)
    throw new UserInputError('Niet toegestaan, je bent geen team eigenaar 👮‍♂️');
};

const isTeamOwner = createValidatorDirective(schema, validate);

export default isTeamOwner;
