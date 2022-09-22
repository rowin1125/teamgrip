import React from 'react'

import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { CgHomeAlt, CgOptions } from 'react-icons/cg'
import { MdFormatListBulleted } from 'react-icons/md'
import { RiDashboard3Line, RiTeamFill } from 'react-icons/ri'

import { routes } from '@redwoodjs/router'

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

import FooterDrawer from './components/FooterDrawer'
import FooterMenuItem from './components/FooterMenuItem'
import FooterMenuItemChild from './components/FooterMenuItemChild'

export const footerMenuHeight = '70px'

const FooterMenu = () => {
  const { isTeamPlayer, isTeamStaff } = useTeamPlayerAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Box mt={footerMenuHeight} display={{ base: 'block', xl: 'none' }}>
      <Box
        h={footerMenuHeight}
        w="full"
        bg="primary.800"
        position="fixed"
        zIndex={9999}
        bottom={0}
      >
        <Flex justifyContent="space-around" alignItems="center" h="full">
          <FooterMenuItem
            title="Dashboard"
            icon={RiDashboard3Line}
            to={routes.app()}
            iconProps={{
              fontSize: 'xl',
            }}
          />
          {isTeamPlayer && (
            <FooterMenuItem title="Team" icon={RiTeamFill} to={routes.team()} />
          )}
          {isTeamStaff && (
            <FooterMenuItem title="Team" icon={RiTeamFill}>
              <FooterMenuItemChild to={routes.team()} icon={RiTeamFill}>
                Overzicht
              </FooterMenuItemChild>
              <FooterMenuItemChild
                to={routes.teamSettings()}
                icon={CgOptions}
                divider={false}
              >
                Instellingen
              </FooterMenuItemChild>
            </FooterMenuItem>
          )}
          <FooterMenuItem title="Club" icon={CgHomeAlt} to={routes.club()} />
          <FooterMenuItem
            title="Instellingen"
            icon={CgOptions}
            to={routes.settings()}
          />
          <FooterMenuItem
            ref={btnRef}
            onClick={onOpen}
            title="Menu"
            icon={MdFormatListBulleted}
          />
        </Flex>
      </Box>
      <FooterDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  )
}

export default FooterMenu
