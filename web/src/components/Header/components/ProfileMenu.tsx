import React from 'react';

import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { useAuth } from 'src/auth';
import { Link as RedwoodLink, routes, useLocation } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/toast';

import Avatar from 'src/components/Avatar/Avatar';

const ProfileMenu = () => {
  const { logOut, currentUser } = useAuth();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logout successful');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const hideAppButton = !pathname.includes('app');

  return (
    <Flex alignItems="center" zIndex={99999}>
      {hideAppButton && (
        <Button
          as={RedwoodLink}
          to={routes.app()}
          mr={4}
          colorScheme="secondary"
        >
          Naar de app
        </Button>
      )}
      <Menu closeOnBlur>
        <MenuButton>
          <Avatar />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Pages">
            <MenuItem as={RedwoodLink} to={routes.home()}>
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
