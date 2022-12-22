import { Box, Heading } from '@chakra-ui/react';

import TeamPlayerSettingsTable from './components/TeamPlayerSettingsTable';
import { useDeletePlayerById } from './hooks/useDeletePlayerById';
import { useGetTeamPlayersForSettings } from './hooks/useGetTeamPlayersForSettings';

const TeamPlayerSettings = () => {
  const { teamWithExtra, teamWithExtraLoading } =
    useGetTeamPlayersForSettings();
  const { handleDeletePlayerById } = useDeletePlayerById();

  if (teamWithExtraLoading) return null;

  const transformedTeamPlayers = teamWithExtra?.players?.map((player) => ({
    id: player?.id,
    naam: player?.displayName,
    'Spelers rol': player?.playerType,
  }));

  return (
    <Box>
      <Heading as="h2" size="lg" mt={8}>
        Beheer jouw spelers
      </Heading>

      <Box my={8} w={{ base: '100%', xl: '600px' }}>
        <Heading as="h3" size="md">
          Spelers in jouw team
        </Heading>

        <TeamPlayerSettingsTable
          entries={transformedTeamPlayers}
          onDelete={handleDeletePlayerById}
        />
      </Box>
    </Box>
  );
};

export default TeamPlayerSettings;
