import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';
import {
  FindTeamByInvitationTokenQuery,
  GetPlayerByGhostInvitationQuery,
} from 'types/graphql';

import TextAlert from 'src/components/TextAlert/TextAlert';

type AcceptIntroTextProps = {
  team: FindTeamByInvitationTokenQuery['teamByInvitationToken'];
  ghostPlayer: GetPlayerByGhostInvitationQuery['getGhostPlayerByInvitation'];
};

const AcceptIntroText = ({ ghostPlayer, team }: AcceptIntroTextProps) => {
  const hasGhostPlayer = !!ghostPlayer?.id;

  return (
    <>
      <Heading color="white">
        Invite voor {team?.name} bij {team?.club?.name} 📬️
      </Heading>
      <Text mt={8} color="white">
        Je hebt een uitnodiging ontvangen voor de {team?.name} bij{' '}
        {team?.club?.name}. Join en maak deel uit van dit fantastische team en
        ga de uitdaging aan.
      </Text>
      {hasGhostPlayer && (
        <Box mt={8}>
          <Text color="white" mb={4}>
            Deze uitnodiging is een unieke uitnoding omdat deze gekoppeld is aan
            een bestaande speler van {team?.name}
          </Text>
          <TextAlert status="warning" color="primary.500">
            <Text>
              Je gaat als je op <u>join als</u> drukt gekoppeld worden aan:{' '}
              <br />- <strong>{ghostPlayer.displayName}</strong>
            </Text>
          </TextAlert>
        </Box>
      )}
      <Text mt={8} fontSize="sm" fontStyle="italic" color="white">
        Indien je geen idee hebt waarom je bent uitgenodigd kan je altijd
        weigeren
      </Text>
    </>
  );
};

export default AcceptIntroText;
