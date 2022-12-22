import React from 'react';

import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { AiFillLock } from 'react-icons/ai';

import { routes } from '@redwoodjs/router';

import RedwoodLink from 'src/components/RedwoodLink';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

type SeasonLockWrapperProps = {
  children: React.ReactNode;
};

const SeasonLockWrapper = ({ children }: SeasonLockWrapperProps) => {
  const { team } = useGetTeamById();
  const { isTeamStaff } = useTeamPlayerAuth();

  const hasSeason = team?.season && team.season?.length > 0;

  const showLock = !hasSeason && isTeamStaff;

  return (
    <Box position="relative" h="full">
      {showLock && (
        <Box inset={0} position="absolute" zIndex={1}>
          <Flex
            bg="primary.500"
            inset={0}
            position="absolute"
            rounded="2xl"
            opacity={0.8}
            filter="blur(3px)"
          ></Flex>
          <Flex
            inset={0}
            position="absolute"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Flex alignItems="center">
              <Icon
                as={AiFillLock}
                color="white"
                fontSize="4xl"
                position="relative"
                top={1.5}
                mr={4}
              />
              <Heading mt={4} color="white" textAlign="center">
                Maak eerst een seizoen aan
              </Heading>
            </Flex>
            {team && (
              <Button
                as={RedwoodLink}
                to={routes.newSeason({
                  id: team.id,
                })}
                mt={4}
                colorScheme="secondary"
              >
                Nieuw seizoen
              </Button>
            )}
          </Flex>
        </Box>
      )}
      <Box filter={showLock ? 'blur(3px)' : ''} h="full">
        {children}
      </Box>
    </Box>
  );
};

export default SeasonLockWrapper;
