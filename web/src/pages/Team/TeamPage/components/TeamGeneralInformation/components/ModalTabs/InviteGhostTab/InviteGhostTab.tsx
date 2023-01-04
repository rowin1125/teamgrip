/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FieldArray, Form, Formik } from 'formik';
import { CgClose } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa';
import { FindTeamQuery } from 'types/graphql';
import * as Yup from 'yup';

import ControlledInput from 'src/components/forms/components/ControlledInput';
import TextAlert from 'src/components/TextAlert/TextAlert';

import ValidateTeamInvitation from '../../ValidateTeamInvitation';

import { useInviteGhosts } from './hooks/useInviteGhosts';

type InviteGhostTabProps = {
  team?: FindTeamQuery['team'];
  onClose: () => void;
};

const validationSchema = Yup.object({
  players: Yup.array().of(
    Yup.object().shape({
      displayName: Yup.string()
        .required('Geef een naam op')
        .min(3, 'De naam moet minimaal 3 tekens hebben'),
    })
  ),
  teamId: Yup.string().required(),
});

const InviteGhostTab = ({ team, onClose }: InviteGhostTabProps) => {
  const handleSubmit = async (values: any, actions: any) => {
    try {
      const playerCountCreated = await handleInviteGhostsPlayers(values);
      if (!playerCountCreated) return;

      actions.resetForm();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const { handleInviteGhostsPlayers, loading } = useInviteGhosts();

  const playersBlueprint = {
    displayName: '',
  };

  return (
    <ValidateTeamInvitation team={team}>
      <>
        <TextAlert status="info">
          <Text>
            <strong>Ghost spelers</strong> zijn spelers zonder een actief
            account bij <strong>TeamGrip</strong>. Gebruik ghost spelers om zelf
            al je team samen te stellen zonder dat speler zelf al een account
            nodig hebben.
          </Text>
          <Text mt={4}>
            Je kunt later echte spelers koppelen aan de ghost accounts zodat
            alle gegevens en statistieken overgenomen kunnen worden.
          </Text>
        </TextAlert>

        <Formik
          initialValues={{
            teamId: team?.id,
            players: [playersBlueprint],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <FieldArray
                name="players"
                render={({ push, remove }) => (
                  <Box>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      {values.players.map((ghostPlayer, index) => {
                        return (
                          <GridItem colSpan={{ base: 2, xl: 1 }} key={index}>
                            {index > 0 && <Divider />}
                            <Heading as="h3" mt={6}>
                              Speler {index + 1}
                            </Heading>
                            <Flex alignItems="center" pr={8} w="full">
                              <ControlledInput
                                labelProps={{ fontWeight: 'normal' }}
                                label="Naam"
                                id={`players.${index}.displayName`}
                                mr={2}
                              />

                              <IconButton
                                icon={<CgClose color="gray" />}
                                variant="ghost"
                                fontSize={20}
                                position="relative"
                                top="8px"
                                aria-label="Clear surcharges"
                                onClick={() => remove(index)}
                              />
                            </Flex>
                          </GridItem>
                        );
                      })}
                    </Grid>
                    <Button
                      onClick={() => push(playersBlueprint)}
                      mt={3}
                      leftIcon={<Icon as={FaPlus} />}
                    >
                      <Box as="span" mt="1px">
                        Extra speler
                      </Box>
                    </Button>
                  </Box>
                )}
              />

              <Button
                mt={8}
                colorScheme="secondary"
                type="submit"
                isLoading={loading}
              >
                {values.players.length > 1 ? (
                  <>Ghost spelers aanmaken</>
                ) : (
                  <>Ghost speler aanmaken</>
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </>
    </ValidateTeamInvitation>
  );
};

export default InviteGhostTab;
