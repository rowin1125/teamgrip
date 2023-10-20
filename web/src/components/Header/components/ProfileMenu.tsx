import React from 'react';

import {
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';

import { Link as RedwoodLink, routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import Avatar from 'src/components/Avatar/Avatar';

const ProfileMenu = () => {
    const { logOut, currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success('Logout successful');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    return (
        <Flex alignItems="center" zIndex={99999}>
            <Menu closeOnBlur>
                <MenuButton>
                    <Avatar />
                </MenuButton>
                <MenuList>
                    <MenuGroup title="Pages">
                        <MenuItem
                            as={'a'}
                            href={process.env.REDWOOD_ENV_WEBSITE_URL || '/'}
                        >
                            Home
                        </MenuItem>
                        {currentUser && (
                            <MenuItem as={RedwoodLink} to={routes.app()}>
                                App
                            </MenuItem>
                        )}
                    </MenuGroup>
                    <MenuDivider />

                    <MenuGroup title="Personal">
                        <MenuItem as={RedwoodLink} to={routes.settings()}>
                            Instellingen
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Log uit</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default ProfileMenu;
