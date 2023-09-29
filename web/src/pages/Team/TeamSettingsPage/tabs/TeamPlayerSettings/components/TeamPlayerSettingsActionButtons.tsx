/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { SlOptionsVertical } from 'react-icons/sl';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import TextAlert from 'src/components/TextAlert/TextAlert';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';

import TeamPlayerSettingsEditPlayerType from './TeamPlayerSettingsEditPlayerType';

type TeamPlayerSettingsActionButtonsProps = {
    row: Record<string, any>;
    onDelete: (id: string) => Promise<void>;
    entries?: Record<string, any>[];
};

const TeamPlayerSettingsActionButtons = ({
    row,
    onDelete,
    entries,
}: TeamPlayerSettingsActionButtonsProps) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { team } = useGetTeamById();
    const rowIsOwner = row.id === team?.owner?.player?.id;

    return (
        <Flex>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<SlOptionsVertical />}
                    variant="ghost"
                />
                <MenuList>
                    <MenuItem as="div" mb={2}>
                        <TeamPlayerSettingsEditPlayerType
                            onClose={onClose}
                            isOpen={isOpen}
                            onOpen={onOpen}
                            entries={entries}
                            row={row}
                            rowIsOwner={rowIsOwner}
                        />
                    </MenuItem>
                    <MenuItem as="div">
                        <DeleteDialog
                            buttonProps={{
                                isDisabled: rowIsOwner,
                            }}
                            buttonVariant={'link'}
                            onDelete={onDelete}
                            id={row.id}
                            title="Training verwijderen"
                            buttonLabel="Verwijderen uit team"
                            buttonLabelProps={{
                                color: 'black',
                                fontSize: 'sm',
                            }}
                            deleteButtonLabel="Verwijderen 🗑️"
                        >
                            <TextAlert status="warning">
                                <i>
                                    Weet je zeker dat je deze speler wilt
                                    verwijderen uit je team?
                                </i>
                            </TextAlert>
                            <Text mt={4}>
                                Alle scores van de wedstrijden en trainingen
                                zullen <strong>wel</strong> worden behouden. Je
                                kunt de speler altijd weer toevoegen aan je team
                                via het kopje `historische spelers`.
                            </Text>
                        </DeleteDialog>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default TeamPlayerSettingsActionButtons;
