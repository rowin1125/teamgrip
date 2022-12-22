import { Box, Flex } from '@chakra-ui/react';

import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';

import Card from 'src/components/Card/Card';
import Hero from 'src/components/Hero/Hero';

import AcceptTeamInvitation from './components/AcceptTeamInvitation';
import UnAuthenticatedJoin from './components/UnAuthenticatedJoin';

const JoinTeamPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <MetaTags title="Join dit team" description="JoinTeam page" />
      <Box h="calc(100vh - 80px)">
        <Hero zIndex={0} size="full" />
        <Flex justifyContent="center" alignItems="center" w="full" h="full">
          <Card
            w={{ base: 'full', xl: '50%' }}
            maxW={{ xl: '800px' }}
            bg="primary.500"
            color="white"
          >
            {isAuthenticated ? (
              <AcceptTeamInvitation />
            ) : (
              <UnAuthenticatedJoin />
            )}
          </Card>
        </Flex>
      </Box>
    </>
  );
};

export default JoinTeamPage;
