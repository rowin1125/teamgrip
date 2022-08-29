import React from 'react'

import { Box, Button, Text } from '@chakra-ui/react'
import { FindTeamQuery } from 'types/graphql'

import { useCreateInvitationToken } from '../../../hooks/useCreateInvitationToken'

type ValidateTeamInvitationProps = {
  team?: FindTeamQuery['team']
  children?:
    | React.ReactNode
    | ((props: { team: FindTeamQuery['team'] }) => React.ReactNode)
}

const ValidateTeamInvitation = ({
  team,
  children,
}: ValidateTeamInvitationProps) => {
  const { handleCreateInvitation, loading } = useCreateInvitationToken(team?.id)
  const hasInvitationToken = team?.invitationToken

  return (
    <>
      {hasInvitationToken ? (
        <>
          {typeof children === 'function'
            ? children({
                team,
              })
            : children}
        </>
      ) : (
        <Box mt={4}>
          <Text>Maak eerst een uitnodiging aan! 📫️</Text>
          <Button isLoading={loading} mt={8} onClick={handleCreateInvitation}>
            Uitnoding genereren
          </Button>
        </Box>
      )}
    </>
  )
}

export default ValidateTeamInvitation
