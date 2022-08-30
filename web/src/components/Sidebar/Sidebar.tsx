import { useState } from 'react'

import {
  Button,
  Flex,
  Icon,
  Image,
  Tooltip,
  useEventListener,
} from '@chakra-ui/react'
import {
  CgHomeAlt,
  CgOptions,
  CgProfile,
  CgPushChevronLeft,
  CgPushChevronRight,
} from 'react-icons/cg'
import { IoIosStats } from 'react-icons/io'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

import { routes } from '@redwoodjs/router'

import SidebarItem from './components/SidebarItem'

const ClOSE_SIDEBAR_KEYS = ['221', '[']

const Sidebar = () => {
  const [navOpen, toggleNav] = useState(true)

  const handler = ({ key }) => {
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
    >
      <Flex flexDir="column" w="full" as="nav">
        <Flex justifyContent="center" alignItems="center" py={6}>
          <Image
            src="/TeamStats Logo.png"
            w={navOpen ? '100px' : '50px'}
            my={navOpen ? 0 : 6}
            h="auto"
          />
        </Flex>

        <SidebarItem
          navOpen={navOpen}
          icon={MdOutlineSpaceDashboard}
          title="Dashboard"
          to={routes.app()}
        />
        <SidebarItem
          navOpen={navOpen}
          icon={RiTeamFill}
          title="Team"
          to={routes.team()}
        />
        <SidebarItem
          navOpen={navOpen}
          icon={CgHomeAlt}
          title="Club"
          to={routes.club()}
        />
        <SidebarItem
          navOpen={navOpen}
          icon={IoIosStats}
          title="Mijn scores"
          to={routes.app()}
        />
        <SidebarItem
          navOpen={navOpen}
          icon={CgProfile}
          title="Mijn profiel"
          to={routes.settings()}
        />
        <SidebarItem
          navOpen={navOpen}
          icon={CgOptions}
          title="Instellingen"
          to={routes.settings()}
          isLast
        />
      </Flex>

      <Flex w="full">
        <Tooltip
          label="Gebruik ` [ ` op je toetsenbord om de navigatie te openen of sluiten"
          placement="top"
          bg="primary.500"
          color="white"
          hasArrow
          openDelay={600}
        >
          <Button
            w="full"
            onClick={() => toggleNav(!navOpen)}
            size="sm"
            colorScheme="primary"
            variant="ghost"
            py={6}
          >
            {navOpen ? 'Sluiten' : ''}{' '}
            <Icon
              ml={navOpen ? 2 : 0}
              as={navOpen ? CgPushChevronLeft : CgPushChevronRight}
              fontSize="xl"
            />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default Sidebar
