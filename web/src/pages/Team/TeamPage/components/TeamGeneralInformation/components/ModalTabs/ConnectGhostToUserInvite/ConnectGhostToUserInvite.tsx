import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { FindTeamQuery } from 'types/graphql';

import TextAlert from 'src/components/TextAlert/TextAlert';

import ValidateTeamInvitation from '../../ValidateTeamInvitation';

import GhostPlayerUniqueInvite from './components/GhostPlayerUniqueInvite';
import { useGetGhostsPlayersForTeam } from './hooks/useGetGhostsPlayersForTeam';

type ConnectGhostToUserInviteProps = {
  team?: FindTeamQuery['team'];
  onClose: () => void;
  handleTabChange: (index: number) => void;
};

const ConnectGhostToUserInvite = ({
  team,
  handleTabChange,
}: ConnectGhostToUserInviteProps) => {
  const { ghostPlayers } = useGetGhostsPlayersForTeam();

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
        {ghostPlayers && ghostPlayers.length > 0 ? (
          ghostPlayers?.map((ghost) => {
            return (
              <GhostPlayerUniqueInvite
                key={ghost?.id}
                ghost={ghost}
                team={team}
              />
            );
          })
        ) : (
          <Text>
            Er zijn geen ghost spelers gevonden. Maak eerst ghostspelers aan via
            <Button
              variant="link"
              textDecor="underline"
              _hover={{ textDecor: 'none' }}
              onClick={() => handleTabChange(1)}
            >
              deze
            </Button>{' '}
            tab
          </Text>
        )}
      </Box>
    </ValidateTeamInvitation>
  );
};

export default ConnectGhostToUserInvite;
