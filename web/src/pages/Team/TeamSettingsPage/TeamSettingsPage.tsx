import { useEffect } from 'react';

import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

import { navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import Card from 'src/components/Card/Card';
import { useGetTeamById } from 'src/hooks/api/query/useGetTeamById';
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

import TeamNotFoundMessage from '../TeamPage/components/TeamNotFoundMessage';

import GlobalTeamSettings from './tabs/GlobalTeamSettings/GlobalTeamSettings';
import TeamHistoryPlayersSettings from './tabs/TeamHistoryPlayersSettings/TeamHistoryPlayersSettings';
import TeamPlayerSettings from './tabs/TeamPlayerSettings';
import TeamSeasonSettings from './tabs/TeamSeasonSettings';

const TeamSettingsPage = () => {
    const { team, loading } = useGetTeamById();
    const { isTeamStaff } = useTeamPlayerAuth();
    const [index, setIndex] = React.useState(0);

    const isPartOfTeam = !!team?.id;

    useEffect(() => {
        if (!isPartOfTeam) return;
        if (!isTeamStaff) {
            navigate(routes.app());
            toast.error('Je hebt geen toegang tot deze pagina');
        }
    }, [isTeamStaff, isPartOfTeam]);

    if (!loading && !isPartOfTeam)
        return (
            <>
                <MetaTags
                    title="Team settings"
                    description="Bekijk en beheer je team instellingen"
                />
                <TeamNotFoundMessage title="Mijn settings" />
            </>
        );

    const menuItems = [
        'Globale instellingen',
        'Spelers beheren',
        'Seizoenen beheren',
        'Historische spelers',
    ];

    return (
        <>
            <MetaTags
                title="Team settings"
                description="Bekijk en beheer je team instellingen"
            />
            <Grid templateColumns="repeat(4, 1fr)" templateRows="auto" gap={10}>
                <GridItem colSpan={{ base: 4, xl: 2 }} rowSpan={1}>
                    <Heading as="h1" size="2xl" color="white">
                        Team settings
                    </Heading>
                </GridItem>
                <GridItem colSpan={{ base: 4, xl: 4 }} rowSpan={1}>
                    <Card overflowX="scroll">
                        <Tabs
                            position="relative"
                            index={index}
                            onChange={(index) => setIndex(index)}
                        >
                            <Box overflow="auto">
                                <Flex
                                    justifyContent="flex-end"
                                    display={{ base: 'flex', lg: 'none' }}
                                >
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<FiChevronDown />}
                                        >
                                            Teaminstellingen{' '}
                                        </MenuButton>
                                        <MenuList>
                                            {menuItems.map((item, i) => (
                                                <MenuItem
                                                    key={item}
                                                    onClick={() => setIndex(i)}
                                                >
                                                    <Text
                                                        color={
                                                            index === i
                                                                ? 'secondary.500'
                                                                : 'black'
                                                        }
                                                        textDecoration={
                                                            index === i
                                                                ? 'underline'
                                                                : 'none'
                                                        }
                                                        fontSize="md"
                                                    >
                                                        {item}
                                                    </Text>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                </Flex>
                                <TabList
                                    w="max-content"
                                    display={{ base: 'none', lg: 'flex' }}
                                >
                                    {menuItems.map((item) => (
                                        <Tab key={item}>
                                            <Text
                                                fontWeight="bold"
                                                fontSize={{
                                                    base: 'sm',
                                                    lg: 'lg',
                                                }}
                                            >
                                                {item}
                                            </Text>
                                        </Tab>
                                    ))}
                                    <Box
                                        display={{ base: 'block', xl: 'none' }}
                                        position="absolute"
                                        right={0}
                                        w="50px"
                                        h="68px"
                                        bg="linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)"
                                    />
                                </TabList>
                            </Box>

                            <TabPanels>
                                <TabPanel>
                                    <GlobalTeamSettings />
                                </TabPanel>
                                <TabPanel overflowX="auto">
                                    <TeamPlayerSettings />
                                </TabPanel>
                                <TabPanel>
                                    <TeamSeasonSettings />
                                </TabPanel>
                                <TabPanel>
                                    <TeamHistoryPlayersSettings />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default TeamSettingsPage;
