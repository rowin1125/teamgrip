import React from 'react'

import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
} from '@chakra-ui/react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { CgHomeAlt, CgOptions } from 'react-icons/cg'
import { IoIosStats } from 'react-icons/io'
import { MdFormatListBulleted } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'
import { TbHome } from 'react-icons/tb'

import { routes } from '@redwoodjs/router'

import AccordionDirectLink from './components/AccordionDirectLink'
import AccordionWithNestedLinks from './components/AccordionWithNestedLinks'
import FooterDrawerHeader from './components/FooterDrawerHeader'

type FooterDrawerProps = {
  isOpen: boolean
  onClose: () => void
  btnRef: React.RefObject<HTMLButtonElement>
}

const FooterDrawer = ({ isOpen, onClose, btnRef }: FooterDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent mb="70px" bg="primary.500" color="white">
        <DrawerCloseButton />
        <FooterDrawerHeader />

        <DrawerBody p={0} overflowY="auto" position="relative" h="full">
          <Box position="relative" mb={4}>
            <Accordion allowToggle allowMultiple>
              <AccordionDirectLink
                onClose={onClose}
                to={routes.home()}
                icon={TbHome}
              >
                Home
              </AccordionDirectLink>
              <AccordionDirectLink
                onClose={onClose}
                to={routes.app()}
                icon={AiOutlineDashboard}
              >
                Dashboard
              </AccordionDirectLink>

              <AccordionWithNestedLinks icon={RiTeamFill}>
                <AccordionDirectLink
                  onClose={onClose}
                  nested
                  to={routes.team()}
                  icon={MdFormatListBulleted}
                >
                  Overzicht
                </AccordionDirectLink>

                <AccordionDirectLink
                  onClose={onClose}
                  nested
                  to={routes.team()}
                  icon={CgOptions}
                >
                  Instellingen
                </AccordionDirectLink>
              </AccordionWithNestedLinks>
              <AccordionDirectLink
                onClose={onClose}
                to={routes.app()}
                icon={IoIosStats}
              >
                Mijn scores
              </AccordionDirectLink>
              <AccordionDirectLink
                onClose={onClose}
                to={routes.club()}
                icon={CgHomeAlt}
              >
                Mijn club
              </AccordionDirectLink>
              <AccordionDirectLink
                onClose={onClose}
                to={routes.settings()}
                icon={CgOptions}
              >
                Instellingen
              </AccordionDirectLink>
            </Accordion>
          </Box>
        </DrawerBody>

        <DrawerFooter boxShadow="5px -30px 21px #242e42" zIndex={4}>
          <Button colorScheme="secondary">Sluiten</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default FooterDrawer
