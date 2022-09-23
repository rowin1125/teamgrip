import {
  UpdateTeamById,
  UpdateTeamByIdVariables,
  UpdateTeamInput,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { gHistory } from '@redwoodjs/router/dist/history'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { TEAM_FRAGMENT } from 'src/graphql/fragments/TeamFragment'

export const UPDATE_TEAM_BY_ID = gql`
  ${TEAM_FRAGMENT}
  mutation UpdateTeamById($id: String!, $input: UpdateTeamInput!) {
    updateTeam(id: $id, input: $input) {
      ...TeamFragment
    }
  }
`

export const useUpdateTeam = (clubs) => {
  const { reauthenticate, currentUser } = useAuth()
  const [updateTeam, { loading: updateTeamLoading }] = useMutation<
    UpdateTeamById,
    UpdateTeamByIdVariables
  >(UPDATE_TEAM_BY_ID, {
    onCompleted: reauthenticate,
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleUpdateTeam = async (input: UpdateTeamInput) => {
    const clubName = clubs
      .find((club) => club.id === input.clubId)
      ?.name?.toLowerCase()
    const teamNameContainsClubName = input.name.toLowerCase().includes(clubName)
    if (teamNameContainsClubName) {
      toast.error('Clubnaam mag niet in teamnaam zitten')
      return
    }
    const variables = {
      id: currentUser?.player?.teamId,
      input: {
        ...input,
        clubTeamName: `${clubName}-${input.name}`,
      },
    }

    const updateTeamById = await updateTeam({
      variables,
    })

    if (!updateTeamById.errors) {
      toast.success('Team succesvol aangepast 🎉')
      gHistory.back()
    }
  }

  return { handleUpdateTeam, updateTeamLoading }
}
