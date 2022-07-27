import React from 'react'

import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link as RedwoodLink, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

const ProfileMenu = () => {
  const { logOut } = useAuth()

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success('Logout successful')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }
  return (
    <Menu closeOnBlur>
      <MenuButton>
        <Avatar
          size="md"
          name="Rowin" // TODO: Make this dynamic based on CurrentUser
          src="https://gitlab.enrise.com/uploads/-/system/user/avatar/251/avatar.png?width=150"
        />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Pages">
          <MenuItem>
            <Link to={routes.contact()} as={RedwoodLink}>
              Contact
            </Link>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />

        <MenuGroup title="Personal">
          <MenuItem>Mijn profiel</MenuItem>
          <MenuItem onClick={handleLogout}>Log uit</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
