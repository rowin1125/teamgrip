import {
  FindTeamByInvitationTokenQuery,
  FindTeamByInvitationTokenQueryVariables,
} from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

import { TEAM_FRAGMENT } from 'src/graphql/fragments/TeamFragment'

const FIND_TEAM_BY_INVITATION_TOKEN = gql`
  ${TEAM_FRAGMENT}
  query FindTeamByInvitationTokenQuery($invitationToken: String!) {
    teamByInvitationToken(invitationToken: $invitationToken) {
      ...TeamFragment
    }
  }
`

export const useGetTeamByInvitationToken = (
  invitationToken: FindTeamByInvitationTokenQueryVariables['invitationToken']
) => {
  if (!invitationToken) return { team: null }

  const { data, loading } = useQuery<
    FindTeamByInvitationTokenQuery,
    FindTeamByInvitationTokenQueryVariables
  >(FIND_TEAM_BY_INVITATION_TOKEN, {
    variables: { invitationToken },
  })

  return { team: data?.teamByInvitationToken, loading }
}
