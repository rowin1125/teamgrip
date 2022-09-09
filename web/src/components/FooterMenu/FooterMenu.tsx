import React from 'react'

import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { CgHomeAlt, CgProfile } from 'react-icons/cg'
import { MdFormatListBulleted } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

import { routes } from '@redwoodjs/router'

import FooterDrawer from './components/FooterDrawer'
import FooterMenuItem from './components/FooterMenuItem'

export const footerMenuHeight = '70px'

const FooterMenu = () => {
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
            icon={AiOutlineDashboard}
            to={routes.app()}
          />
          <FooterMenuItem title="Team" icon={RiTeamFill} to={routes.team()} />
          <FooterMenuItem title="Club" icon={CgHomeAlt} to={routes.club()} />
          <FooterMenuItem
            title="Profiel"
            icon={CgProfile}
            to={routes.settings()}
          />
          <FooterMenuItem
            ref={btnRef}
            onClick={onOpen}
            title="Instellingen"
            icon={MdFormatListBulleted}
          />
        </Flex>
      </Box>
      <FooterDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  )
}

export default FooterMenu
