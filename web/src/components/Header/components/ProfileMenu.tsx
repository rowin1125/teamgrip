import React from 'react'

import {
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import Avatar from 'avataaars'

import { useAuth } from '@redwoodjs/auth'
import { Link as RedwoodLink, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { generateRandomAvatarOptions } from 'src/pages/ActivatePage/components/steps/Avatar/helpers/generateRandomAvatar'

const ProfileMenu = () => {
  const { logOut, currentUser } = useAuth()

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
        {currentUser?.avatar?.avatarStyle ? (
          <Avatar
            style={{ width: '60px', height: '60px' }}
            {...currentUser?.avatar}
          />
        ) : (
          <Avatar
            style={{ width: '60px', height: '60px' }}
            avatarStyle="Circle"
            {...generateRandomAvatarOptions()}
          />
        )}
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
