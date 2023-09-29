import { GridItem, Heading, Text } from '@chakra-ui/react';

import { useAuth } from 'src/auth';
import Card from 'src/components/Card/Card';
import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import { useDeletePlayerById } from 'src/pages/Team/TeamSettingsPage/tabs/TeamPlayerSettings/hooks/useDeletePlayerById';

const LeaveTeamSettings = () => {
    const { handleDeletePlayerById, handleDeletePlayerByIdLoading } =
        useDeletePlayerById(true);
    const { currentUser } = useAuth();

    return (
        <GridItem
            colSpan={{ base: 12, xl: 6 }}
            flexGrow={{ xl: 1 }}
            mb={{ base: 10, xl: 0 }}
        >
            <Card h="full">
                <Heading as="h3" size="md" color="red.500">
                    Danger-zone
                </Heading>
                <Text mt={4}>
                    Hier kun je jezelf terugtrekken uit het team. Deze actie kan
                    niet ongedaan worden gemaakt. Hierna moet je of opnieuw een
                    andere uitnodiging ontvangen of zelf een team starten
                </Text>
                <DeleteDialog
                    onDelete={handleDeletePlayerById}
                    id={currentUser?.player?.id || ''}
                    title="Jezelf verwijderen uit het team"
                    buttonLabel="Jezelf verwijderen uit het team"
                    buttonProps={{ ml: 0, mt: 4 }}
                    loading={handleDeletePlayerByIdLoading}
                    deleteButtonLabel="Verwijderen 🗑️"
                >
                    <Text>
                        Weet je zeker dat je jezelf wilt verwijderen uit het
                        team?
                    </Text>
                </DeleteDialog>
            </Card>
        </GridItem>
    );
};

export default LeaveTeamSettings;
