/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    UseDisclosureProps,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { AiOutlineEdit } from 'react-icons/ai';
import * as Yup from 'yup';

import { useAuth } from 'src/auth';
import ControlledSelect from 'src/components/forms/components/ControlledSelect';
import TextAlert from 'src/components/TextAlert/TextAlert';

import { useUpdatePlayerById } from '../hooks/useUpdatePlayerById';

type TeamPlayerSettingsEditPlayerTypeProps = UseDisclosureProps & {
    entries?: Record<string, any>[];
    row: Record<string, any>;
    rowIsOwner?: boolean;
};

const validationSchema = Yup.object().shape({
    playerType: Yup.string().required('Type speler is verplicht'),
});

const TeamPlayerSettingsEditPlayerType = ({
    isOpen,
    onClose,
    onOpen,
    entries,
    row,
    rowIsOwner,
}: TeamPlayerSettingsEditPlayerTypeProps) => {
    const { currentUser } = useAuth();
    const { handleUpdatePlayer, handleUpdatePlayerLoading } =
        useUpdatePlayerById({
            onClose: onClose || (() => {}),
        });
    if (!onClose || !onOpen) return null;

    const uniquePlayerType = new Set();
    entries?.forEach((entry) => {
        uniquePlayerType.add(entry['Spelers rol']);
    });

    const selectOptions = Array.from(uniquePlayerType).map((playerType) => ({
        label: playerType as string,
        value: playerType as string,
    }));
    const isCurrentPlayerRole = row?.id === currentUser?.player?.id;

    return (
        <>
            <Button
                colorScheme="orange"
                variant="link"
                onClick={onOpen}
                isDisabled={rowIsOwner || isCurrentPlayerRole}
            >
                <Icon as={AiOutlineEdit} />{' '}
                <Text fontSize="sm" ml={4}>
                    Wijzig speler
                </Text>
            </Button>

            <Modal isOpen={isOpen || false} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading>Update speler: {row.naam}</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TextAlert status="warning" mb={{ base: 4, xl: 0 }}>
                            <i>
                                Bij het wijzigen van de spelersrol krijgt de
                                speler / persoon extra rechten binnen het team{' '}
                            </i>
                        </TextAlert>
                        <Box overflowX="auto">
                            <Formik
                                initialValues={{
                                    id: row.id,
                                    playerType: row['Spelers rol'],
                                }}
                                onSubmit={handleUpdatePlayer}
                                validationSchema={validationSchema}
                            >
                                <Box as={Form} w="full">
                                    <ControlledSelect
                                        options={selectOptions}
                                        id="playerType"
                                        label="Spelers rol"
                                        placeholder="Selecteer een rol"
                                    />

                                    <Flex
                                        justifyContent="flex-end"
                                        flexDirection={{
                                            base: 'column',
                                            xl: 'row',
                                        }}
                                    >
                                        <Button
                                            colorScheme="primary"
                                            onClick={onClose}
                                            variant={'outline'}
                                            mt={4}
                                            mb={{ base: 0, xl: 4 }}
                                            mr={{ base: 0, xl: 4 }}
                                        >
                                            Annuleer
                                        </Button>
                                        <Button
                                            colorScheme="secondary"
                                            type="submit"
                                            mt={4}
                                            mb={4}
                                            isLoading={
                                                handleUpdatePlayerLoading
                                            }
                                        >
                                            Opslaan
                                        </Button>
                                    </Flex>
                                </Box>
                            </Formik>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TeamPlayerSettingsEditPlayerType;
