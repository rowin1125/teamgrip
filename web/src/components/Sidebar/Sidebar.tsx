import React from 'react'

import { Box, Button, Divider, Flex, Image, List, Text } from '@chakra-ui/react'
import { CgHomeAlt, CgProfile, CgOptions } from 'react-icons/cg'
import { IoIosStats } from 'react-icons/io'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

import { Link, routes } from '@redwoodjs/router'

import SidebarListItem from './components/SidebarListItem'

const Sidebar = () => {
  return (
    <Box
      as="aside"
      bg="white"
      p={4}
      rounded="3xl"
      boxShadow="lg"
      position="sticky"
      top={8}
      display={{ base: 'none', md: 'none', lg: 'block' }}
    >
      <Flex justifyContent="center" alignItems="center" mt={4}>
        <Image h="100px" src="/TeamStats Logo.png" alt="Redwood" />
      </Flex>
      <Flex justifyContent="center" alignItems="center" pt={6} pb={6}>
        <Divider w="80%" />
      </Flex>
      <List spacing={1} as="nav">
        <SidebarListItem
          listItem="dashboard"
          href="/"
          icon={MdOutlineSpaceDashboard}
        />
        <SidebarListItem
          listItem="teams"
          href={routes.app()}
          icon={RiTeamFill}
        />
        <SidebarListItem
          listItem="clubs"
          href={routes.app()}
          icon={CgHomeAlt}
        />
        <SidebarListItem
          listItem="scores"
          href={routes.app()}
          icon={IoIosStats}
        />
        <Text fontWeight="bold" pl={4} py={2} fontSize="xl">
          Account instellingen
        </Text>
        <SidebarListItem
          listItem="Mijn profiel"
          href={routes.app()}
          icon={CgProfile}
        />
        <SidebarListItem
          listItem="Instellingen"
          href={routes.settings()}
          icon={CgOptions}
        />
      </List>
      <Link to="/">
        <Button colorScheme="primary" w="full" my={2}>
          Something
        </Button>
      </Link>
      <Button colorScheme="secondary" w="full" mt={2}>
        {/* This text will be either removed or replaced in the future so translating this doesnt make sense */}
        Nog een actie
      </Button>
    </Box>
  )
}

export default Sidebar
