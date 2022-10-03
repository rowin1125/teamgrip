import { Flex, Image, useEventListener } from '@chakra-ui/react'
import { CgHomeAlt, CgOptions } from 'react-icons/cg'
import { MdFormatListBulleted } from 'react-icons/md'
import { RiDashboard3Line, RiTeamFill } from 'react-icons/ri'

import { routes } from '@redwoodjs/router'

import useLocalStorage from 'src/hooks/global/useLocalStorage'
import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import RedwoodLink from '../RedwoodLink'

import SidebarItem from './components/SidebarItem'
import SidebarItemChild from './components/SidebarItemChild'
import SidebarToggle from './components/SidebarToggle'

const ClOSE_SIDEBAR_KEYS = ['221', '[']

const Sidebar = () => {
  const [navOpen, toggleNav] = useLocalStorage('navOpen', true)
  const { isTeamStaff, isTeamPlayer } = useTeamPlayerAuth()

  const handler = ({ key }: { key: string }) => {
    if (ClOSE_SIDEBAR_KEYS.includes(String(key))) {
      toggleNav(!navOpen)
    }
  }

  useEventListener('keydown', handler)

  return (
    <Flex
      pos="sticky"
      left="0"
      top={0}
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      flexDir="column"
      justifyContent="space-between"
      borderTopRightRadius="10px"
      borderBottomRightRadius="10px"
      bg="white"
      display={{ base: 'none', xl: 'flex' }}
      zIndex={4}
    >
      <Flex flexDir="column" w="full" as="nav">
        <Flex justifyContent="center" alignItems="center" py={6}>
          <RedwoodLink to={routes.home()}>
            <Image
              src="/TeamGrip Logo.png"
              w={navOpen ? '100px' : '50px'}
              my={navOpen ? 0 : 6}
              h="auto"
            />
          </RedwoodLink>
        </Flex>

        <SidebarItem
          navOpen={navOpen}
          icon={RiDashboard3Line}
          title="Dashboard"
          to={routes.app()}
        />
        {isTeamPlayer && (
          <SidebarItem
            navOpen={navOpen}
            icon={RiTeamFill}
            title="Team"
            to={routes.team()}
          />
        )}
        {isTeamStaff && (
          <SidebarItem
            navOpen={navOpen}
            icon={RiTeamFill}
            title="Team"
            to={routes.team()}
          >
            <SidebarItemChild icon={MdFormatListBulleted} to={routes.team()}>
              Overzicht
            </SidebarItemChild>
            <SidebarItemChild
              icon={CgOptions}
              divider={false}
              to={routes.teamSettings()}
            >
              Instellingen
            </SidebarItemChild>
          </SidebarItem>
        )}
        <SidebarItem
          navOpen={navOpen}
          icon={CgHomeAlt}
          title="Club"
          to={routes.club()}
        />

        <SidebarItem
          navOpen={navOpen}
          icon={CgOptions}
          title="Instellingen"
          to={routes.settings()}
          isLast
        />
      </Flex>

      <SidebarToggle navOpen={navOpen} toggleNav={toggleNav} />
    </Flex>
  )
}

export default Sidebar
