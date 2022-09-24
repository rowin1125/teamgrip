import { Box, Button, Flex, Heading, IconButton, Image } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import RedwoodLink from '../RedwoodLink'

import ProfileMenu from './components/PagesHeaderProfileMenu'

const PagesHeader = () => {
  const { currentUser } = useAuth()

  return (
    <Box as="header" w="full" py={4} zIndex={10} position="relative">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <RedwoodLink to={routes.home()}>
            <Flex alignItems="center">
              <Image src="/TeamGrip Logo.png" w={'80px'} h="auto" />
              <Heading
                color="white"
                ml={4}
                fontSize="5xl"
                display={{ base: 'none', xl: 'block' }}
              >
                TeamGrip
              </Heading>
            </Flex>
          </RedwoodLink>
        </Box>
        <Flex alignItems="center">
          {/* <StyledIconButton
            mx={8}
            aria-label="Notifications"
            variant="ghost"
            icon={<Icon as={CgBell} color="white" fontSize="2xl" />}
          /> */}
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

export default PagesHeader
