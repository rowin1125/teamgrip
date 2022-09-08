import {
  CreateTeamInput,
  CreateTeamMutation,
  CreateTeamMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { FIND_TEAM_QUERY } from 'src/hooks/api/query/useGetTeamById'

const CREATE_TEAM_MUTATION = gql`
  mutation CreateTeamMutation($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
    }
  }
`

export const useCreateTeam = (clubs) => {
  const { reauthenticate } = useAuth()

  const [createTeam, { loading }] = useMutation<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >(CREATE_TEAM_MUTATION, {
    onCompleted: reauthenticate,
    refetchQueries: [
      {
        query: FIND_TEAM_QUERY,
      },
    ],
  })

  const handleCreateTeam = async (values: CreateTeamInput) => {
    const teamNameContainsClubName = values.name
      .toLowerCase()
      .includes(
        clubs.find((club) => club.id === values.clubId)?.name?.toLowerCase()
      )
    if (teamNameContainsClubName) {
      toast.error('Clubnaam mag niet in teamnaam zitten')
      return
    }

    try {
      const team = await createTeam({
        variables: { input: values },
      })
      toast.success(`Team ${team.data.createTeam.name} aangemaakt`)
      navigate(routes.team())
    } catch (error) {
      toast.error(error.message)
    }
  }

  return {
    handleCreateTeam,
    loading,
  }
}
