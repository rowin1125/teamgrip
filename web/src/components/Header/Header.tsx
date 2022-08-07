import React from 'react'

import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import { CgBell, CgSearch } from 'react-icons/cg'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, useLocation } from '@redwoodjs/router'

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'

import ProfileMenu from './components/ProfileMenu'

const Header = () => {
  const { currentUser } = useAuth()
  const { pathname } = useLocation()
  const showBreadCrumbs = pathname.includes('app')

  return (
    <Box as="header" w="full" pl={8} pb={4} mb={10}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>{showBreadCrumbs && <BreadCrumbs />}</Box>
        <Flex alignItems="center">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={CgSearch} color="white" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Zoek teams"
              _placeholder={{
                color: 'white',
                opacity: 0.6,
              }}
              color="white"
            />
          </InputGroup>
          <StyledIconButton
            mx={8}
            aria-label="Notifications"
            variant="ghost"
            icon={<Icon as={CgBell} color="white" fontSize="2xl" />}
          />
          {currentUser ? (
            <ProfileMenu />
          ) : (
            <Button
              as={Link}
              to={routes.login()}
              variant="solid"
              colorScheme="gray"
              minWidth={120}
            >
              Inloggen
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

const StyledIconButton = styled(IconButton)`
  &:hover {
    svg {
      color: ${(props) => props.theme.colors.primary[500]};
    }
  }
`

export default Header
