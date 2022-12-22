import { Box, Button, Text } from '@chakra-ui/react';

import { routes } from '@redwoodjs/router';

import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

import RedwoodLink from '../RedwoodLink';
import TextAlert from '../TextAlert/TextAlert';

const NoSeasonAlert = () => {
  const { isTeamStaff } = useTeamPlayerAuth();
  const { team, loading } = useGetTeamById();
  if (loading || !team?.id || !isTeamStaff) return null;

  const someSeasonActive = team?.season.some((season) => season?.active);
  if (someSeasonActive) return null;

  return (
    <Box mx={10}>
      <TextAlert status="error" mb={10}>
        <Text>
          Er is op dit moment nog geen actief seizoen.{' '}
          <Button
            as={RedwoodLink}
            to={routes.teamSettings()}
            variant="link"
            textDecor="underline"
          >
            Activeer
          </Button>{' '}
          een seizoen om data zichtbaar te maken
        </Text>
      </TextAlert>
    </Box>
  );
};

export default NoSeasonAlert;
