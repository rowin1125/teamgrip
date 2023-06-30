import React from 'react';

import { GridItem, Flex, Box, Heading, Button } from '@chakra-ui/react';

import { routes } from '@redwoodjs/router';

import Avatar from 'src/components/Avatar/Avatar';
import Card from 'src/components/Card/Card';
import RedwoodLink from 'src/components/RedwoodLink';
import DefaultLoader from 'src/components/Loaders/DefaultLoader/DefaultLoader';
import { useAuth } from 'src/auth';

const AvatarSettings = () => {
  const { loading } = useAuth();
  return (
    <GridItem
      colSpan={{ base: 12, xl: 4 }}
      flexGrow={{ xl: 1 }}
      mb={{ base: 10, xl: 0 }}
    >
      <Card h="full">
        <DefaultLoader isLoading={loading}>
          <Flex flexDirection="column" justifyContent="space-between" h="full">
            <Box>
              <Heading size="md">Avatar</Heading>
              <Flex justifyContent="center" alignItems="center">
                <Avatar size="200" />
              </Flex>
            </Box>
            <Button
              as={RedwoodLink}
              to={routes.updateAvatar()}
              mt={{ base: 8, xl: 0 }}
            >
              Wijzig avatar
            </Button>
          </Flex>
        </DefaultLoader>
      </Card>
    </GridItem>
  );
};

export default AvatarSettings;
