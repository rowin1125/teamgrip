import React from 'react';

import { GridItem, Heading, Box, Stack, Switch, Text } from '@chakra-ui/react';

import Card from 'src/components/Card/Card';

const GlobalSettings = () => {
  return (
    <GridItem
      colSpan={{ base: 12, xl: 4 }}
      flexGrow={{ xl: 1 }}
      mb={{ base: 10, xl: 0 }}
    >
      <Card>
        <Heading size="md">Globale instellingen (BETA)</Heading>
        <Box>
          <Text mt={4} fontWeight="bold">
            Account emails
          </Text>
          <Stack spacing={4}>
            <Switch disabled color="gray.500">
              Score updates
            </Switch>
            <Switch disabled color="gray.500">
              Teamuitnodigingen
            </Switch>
            <Switch disabled color="gray.500">
              Club updates
            </Switch>
          </Stack>
        </Box>
        <Box>
          <Text mt={4} fontWeight="bold">
            Applicatie
          </Text>
          <Stack spacing={4}>
            <Switch disabled color="gray.500">
              Voetbalnieuws
            </Switch>
            <Switch disabled color="gray.500">
              Applicatie updates
            </Switch>
            <Switch disabled color="gray.500">
              Nieuwsbrief
            </Switch>
          </Stack>
        </Box>
      </Card>
    </GridItem>
  );
};

export default GlobalSettings;
