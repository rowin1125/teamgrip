import {
  InviteGhostsPlayersMutation,
  InviteGhostsPlayersMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { GET_PLAYERS_FOR_TEAM_QUERY } from 'src/pages/Team/TeamPage/hooks/useGetPlayersForTeam'

export const INVITE_GHOSTS_PLAYERS = gql`
  mutation InviteGhostsPlayersMutation($input: CreateGhostPlayersInput!) {
    createManyGhostPlayers(input: $input) {
      count
    }
  }
`

export const useInviteGhosts = () => {
  const [inviteGhostPlayers, { loading, error }] = useMutation<
    InviteGhostsPlayersMutation,
    InviteGhostsPlayersMutationVariables
  >(INVITE_GHOSTS_PLAYERS, {
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleInviteGhostsPlayers = async (input) => {
    const ghostPlayers = await inviteGhostPlayers({
      variables: {
        input: input,
      },
      refetchQueries: [
        {
          query: GET_PLAYERS_FOR_TEAM_QUERY,
          variables: { teamId: input.teamId },
        },
      ],
    })
    if (!ghostPlayers.errors) {
      toast.success(
        `${ghostPlayers.data?.createManyGhostPlayers?.count} ghostspelers succesvol aangemaakt 👻`
      )
    }
    return ghostPlayers.data?.createManyGhostPlayers?.count
  }

  return {
    handleInviteGhostsPlayers,
    loading,
    error,
  }
}
