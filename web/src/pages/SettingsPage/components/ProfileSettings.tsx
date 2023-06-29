import React from 'react';

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';

import { useAuth } from 'src/auth';
import { routes } from '@redwoodjs/router';

import Card from 'src/components/Card/Card';
import RedwoodLink from 'src/components/RedwoodLink';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';
import {
  allWordsCapitalized,
  capitalizeText,
} from 'src/helpers/textHelpers/capitalizeText/capitalizeText';
import DefaultLoader from 'src/components/Loaders/DefaultLoader/DefaultLoader';

const ProfileSettings = () => {
  const { currentUser } = useAuth();
  const { team, loading } = useGetTeamById();

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
              <Heading size="md">Mijn profiel</Heading>
              <Grid templateColumns="repeat(3, 1fr)" mt={4} gap={2}>
                <GridItem colSpan={1}>
                  <Text fontWeight="bold" color="black">
                    Voornaam:
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>
                    {capitalizeText(
                      currentUser?.userProfile?.firstname || 'Onbekend'
                    )}
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontWeight="bold" color="black">
                    Achternaam:
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>
                    {capitalizeText(
                      currentUser?.userProfile?.lastname || 'Onbekend'
                    )}
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontWeight="bold" color="black">
                    Email:
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{currentUser?.email}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontWeight="bold" color="black">
                    Club:
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{team?.club?.name}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontWeight="bold" color="black">
                    Team:
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>{team?.name}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontWeight="bold" color="black">
                    Team eigenaar:
                  </Text>
                </GridItem>
                <GridItem colSpan={2}>
                  {allWordsCapitalized(
                    `${team?.owner?.userProfile.firstname} ${team?.owner?.userProfile.lastname}` ||
                      'Onbekend'
                  )}
                </GridItem>
              </Grid>
            </Box>
            <Button
              as={RedwoodLink}
              to={routes.updateUser()}
              mt={{ base: 8, xl: 0 }}
            >
              Wijzig profiel
            </Button>
          </Flex>
        </DefaultLoader>
      </Card>
    </GridItem>
  );
};

export default ProfileSettings;
