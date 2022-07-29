import React from 'react'

import { Box, Button, Divider, Flex, Image, List, Text } from '@chakra-ui/react'

import { Link } from '@redwoodjs/router'

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
        <SidebarListItem listItem="dashboard" href="/" />
        <SidebarListItem listItem="teams" href="/teams" />
        <SidebarListItem listItem="clubs" href="/clubs" />
        <SidebarListItem listItem="scores" href="/scores" />
        <Text fontWeight="bold" pl={4} py={2} fontSize="xl">
          Account settings
        </Text>
        <SidebarListItem listItem="myProfile" href="/my-profile" />
        <SidebarListItem listItem="settings" href="/settings" />
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
