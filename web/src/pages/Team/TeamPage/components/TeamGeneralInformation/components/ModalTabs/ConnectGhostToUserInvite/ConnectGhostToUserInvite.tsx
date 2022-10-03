import { Box, Heading, Text } from '@chakra-ui/react'
import { FindTeamQuery } from 'types/graphql'

import TextAlert from 'src/components/TextAlert/TextAlert'

import ValidateTeamInvitation from '../../ValidateTeamInvitation'

import GhostPlayerUniqueInvite from './components/GhostPlayerUniqueInvite'
import { useGetGhostsPlayersForTeam } from './hooks/useGetGhostsPlayersForTeam'

type ConnectGhostToUserInviteProps = {
  team?: FindTeamQuery['team']
  onClose: () => void
}

const ConnectGhostToUserInvite = ({ team }: ConnectGhostToUserInviteProps) => {
  const { ghostPlayers } = useGetGhostsPlayersForTeam()

  return (
    <ValidateTeamInvitation team={team}>
      <TextAlert status="info">
        <Text>
          <strong>Ghost spelers</strong> kunnen gekoppeld worden aan echte
          spelers van je team. De unieke uitnodiging zorgt ervoor dat alle
          punten en statistieken worden overgenomen bij het aanmelden van het
          account.
        </Text>
      </TextAlert>

      <Heading as="h3" my={8}>
        Maak unieke uitnodigingen per speler aan.
      </Heading>
      <Box mt={4}>
        {ghostPlayers?.map((ghost) => {
          return (
            <GhostPlayerUniqueInvite
              key={ghost?.id}
              ghost={ghost}
              team={team}
            />
          )
        })}
      </Box>
    </ValidateTeamInvitation>
  )
}

export default ConnectGhostToUserInvite
