/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateTeamInput,
  CreateTeamMutation,
  CreateTeamMutationVariables,
  GetClubsQuery,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeamMutation($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
    }
  }
`;

export const useCreateTeam = (clubs?: GetClubsQuery['clubs']) => {
  const { reauthenticate } = useAuth();

  const [createTeam, { loading }] = useMutation<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >(CREATE_TEAM_MUTATION, {
    onCompleted: reauthenticate,
  });

  const handleCreateTeam = async (values: CreateTeamInput) => {
    const clubName = clubs
      ?.find((club) => club.id === values.clubId)
      ?.name?.toLowerCase();
    const teamNameContainsClubName = values.name
      .toLowerCase()
      .includes(clubName || '');
    if (teamNameContainsClubName) {
      toast.error('Clubnaam mag niet in teamnaam zitten');
      return;
    }

    try {
      const team = await createTeam({
        variables: {
          input: {
            ...values,
            clubTeamName: `${clubName}-${values.name}`,
          },
        },
      });
      toast.success(`Team ${team?.data?.createTeam.name} aangemaakt`);
      navigate(routes.team());
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return {
    handleCreateTeam,
    loading,
  };
};
