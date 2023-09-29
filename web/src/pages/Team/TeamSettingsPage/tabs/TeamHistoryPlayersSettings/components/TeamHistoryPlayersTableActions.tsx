import { Button, Flex, Icon, useClipboard } from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import { TbCheck } from 'react-icons/tb';

import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';

const TeamHistoryPlayersTableActions = () => {
    const { team } = useGetTeamById();

    const inviteUrl = `${process.env.REDWOOD_ENV_VERCEL_URL}/app/team/join?invitationToken=${team?.invitationToken}`;
    const { hasCopied, onCopy } = useClipboard(inviteUrl);

    return (
        <Flex>
            <Button onClick={onCopy} color="white">
                {hasCopied ? (
                    <>
                        <Icon as={TbCheck} color="white" mr={2} /> Gekopieerd
                    </>
                ) : (
                    <>
                        <Icon as={MdContentCopy} color="white" mr={2} /> Kopieer
                        link
                    </>
                )}
            </Button>
        </Flex>
    );
};

export default TeamHistoryPlayersTableActions;
