import React from 'react'

import { Flex, Link, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { CgHomeAlt, CgOptions, CgProfile } from 'react-icons/cg'
import { IoIosStats } from 'react-icons/io'
import { IconType } from 'react-icons/lib'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

import { useLocation, Link as RedwoodLink } from '@redwoodjs/router'

type SidebarListItemProps = {
  listItem:
    | 'dashboard'
    | 'teams'
    | 'clubs'
    | 'scores'
    | 'myProfile'
    | 'settings'
  href: string
}

const ICON_MAP: Record<SidebarListItemProps['listItem'], IconType> = {
  dashboard: MdOutlineSpaceDashboard,
  teams: RiTeamFill,
  clubs: CgHomeAlt,
  scores: IoIosStats,
  myProfile: CgProfile,
  settings: CgOptions,
}

const SidebarListItem = ({ listItem, href }: SidebarListItemProps) => {
  const { pathname } = useLocation()

  const isHomepage = listItem === 'dashboard' && pathname === '/'

  const active = (pathname.includes(listItem) && !isHomepage) || isHomepage

  return (
    <Link as={RedwoodLink} to={href}>
      <ListItem
        m={0}
        w="216px"
        key={listItem}
        display="flex"
        alignItems="center"
        rounded="lg"
        transition="all 0.1s ease-in-out"
        p={4}
        _hover={{
          shadow: 'inner',
          cursor: 'pointer',
        }}
        shadow={active ? 'inner' : 'none'}
      >
        <Flex>
          <Flex
            bg={active ? 'primary.500' : undefined}
            justifyContent="center"
            alignItems="center"
            w="30px"
            h="30px"
            rounded="lg"
          >
            <ListIcon
              as={ICON_MAP[listItem]}
              color={active ? 'white' : 'primary.500'}
              m={0}
            />
          </Flex>
          <Text ml={4} fontWeight="bold">
            {listItem}
          </Text>
        </Flex>
      </ListItem>
    </Link>
  )
}

export default SidebarListItem
