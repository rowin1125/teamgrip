import React from 'react';

import {
    Box,
    Button,
    Flex,
    Icon,
    Input,
    Text,
    useClipboard,
} from '@chakra-ui/react';
import { BsWhatsapp } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { TbCheck } from 'react-icons/tb';
import { FindTeamQuery, GetGhostPlayersForTeamQuery } from 'types/graphql';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import TextAlert from 'src/components/TextAlert/TextAlert';

import { useCreateGhostPlayerInvitation } from '../hooks/useCreateGhostPlayerInvitation';
import { useDeleteGhostPlayerInvitation } from '../hooks/useDeleteGhostPlayerInvitation';

type GhostPlayerUniqueInviteProps = {
    team?: FindTeamQuery['team'];
    ghost: GetGhostPlayersForTeamQuery['getGhostPlayersByTeamId'][0];
};

const GhostPlayerUniqueInvite = ({
    ghost,
    team,
}: GhostPlayerUniqueInviteProps) => {
    const { handleCreateInvitation, loading } =
        useCreateGhostPlayerInvitation();
    const hasGhostInvitation = !!ghost?.ghostInvitation;

    const inviteUrl = `${process.env.REDWOOD_ENV_VERCEL_URL}/team/join?invitationToken=${team?.invitationToken}&ghostInvitation=${ghost?.ghostInvitation}`;

    const { hasCopied, onCopy } = useClipboard(inviteUrl);
    const { handleDeleteGhostPlayerInvitation, loading: deleteLoading } =
        useDeleteGhostPlayerInvitation();

    return (
        <Flex
            flexDir={{ base: 'column', xl: 'row' }}
            my={4}
            w={{ base: 'full' }}
        >
            <Text
                minW="180px"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                fontWeight="bold"
            >
                {ghost?.displayName}
            </Text>
            <Input
                title={
                    hasGhostInvitation
                        ? inviteUrl
                        : 'Geen uitnoding aanwezig op het moment'
                }
                value={
                    hasGhostInvitation
                        ? inviteUrl
                        : 'Geen uitnoding aanwezig op het moment'
                }
                isReadOnly
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                maxW={{ base: 'auto', xl: '50%' }}
                isDisabled={!hasGhostInvitation}
                mb={{ base: 4, xl: 0 }}
            />
            {hasGhostInvitation ? (
                <Box display={{ base: 'flex', xl: 'flex' }}>
                    <Button
                        w="full"
                        onClick={onCopy}
                        ml={{ base: 0, xl: 4 }}
                        color="white"
                    >
                        {hasCopied ? (
                            <Icon as={TbCheck} color="white" />
                        ) : (
                            <Icon as={MdContentCopy} color="white" />
                        )}
                    </Button>
                    <Button
                        w="full"
                        mx={{ base: 4, xl: 4 }}
                        as="a"
                        target="_blank"
                        href={`https://api.whatsapp.com/send?text=TeamGrip:+Je+ben+uitgenodigd+om+een+team+te+joinen.+Bekijk+nu+je+uitnodiging:+${encodeURI(
                            inviteUrl
                        )}`}
                        colorScheme="whatsapp"
                    >
                        <Icon as={BsWhatsapp} />
                    </Button>
                    <DeleteDialog
                        onDelete={handleDeleteGhostPlayerInvitation}
                        id={ghost.id}
                        loading={deleteLoading}
                        buttonProps={{
                            w: 'full',
                        }}
                        title="Uitnodiging intrekken"
                    >
                        <TextAlert status="warning" mb={4}>
                            De huidige uitnodiging is na het intrekken niet meer
                            te gebruiken.
                        </TextAlert>
                        <Text>
                            Weet je zeker dat je deze uitnodiging wilt
                            intrekken?
                        </Text>
                    </DeleteDialog>
                </Box>
            ) : (
                <Button
                    ml={{ base: 0, xl: 4 }}
                    isLoading={loading}
                    onClick={() => handleCreateInvitation(ghost?.id || '')}
                >
                    Maak uitnodiging
                </Button>
            )}
        </Flex>
    );
};

export default GhostPlayerUniqueInvite;
