import { As, Box, Button, Flex, Icon, Tooltip } from '@chakra-ui/react'
import { CgChevronRight } from 'react-icons/cg'

import { useLocation } from '@redwoodjs/router'

import RedwoodLink from 'src/components/RedwoodLink'

type SidebarItemProps = {
  title: string
  icon: As
  navOpen: boolean
  to: string
  isLast?: boolean
}

const SidebarItem = ({
  icon,
  title,
  navOpen,
  to,
  isLast,
}: SidebarItemProps) => {
  const { pathname } = useLocation()

  const isHomepage =
    title.toLocaleLowerCase() === 'dashboard' && pathname === '/app'
  const active =
    (pathname.includes(title.toLocaleLowerCase()) && !isHomepage) || isHomepage

  return (
    <>
      <Tooltip
        isDisabled={navOpen}
        label={title}
        placement="auto"
        bg="secondary.500"
        color="white"
        hasArrow
      >
        <Box
          borderTop="1px"
          borderColor="gray.200"
          borderBottom={isLast ? '1px solid #E2E8F0' : '0px'} // gray.200
          py={0}
        >
          {navOpen ? (
            <Button
              as={RedwoodLink}
              to={to}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={4}
              py={8}
              w="full"
              bg={active ? 'primary.500' : ''}
              color={active ? 'white' : 'primary.500'}
              borderRight={active ? '4px solid' : ''}
              borderRightColor="secondary.500"
              borderRadius={0}
              _hover={{
                bg: active ? 'primary.600' : 'primary.50',
              }}
              _active={{
                bg: active ? 'primary.800' : 'primary.100',
              }}
            >
              <Flex alignItems="center">
                <Icon as={icon} mr={4} />
                {title}
              </Flex>
              <Icon as={CgChevronRight} ml={4} />
            </Button>
          ) : (
            <Flex justifyContent="center">
              <Button
                as={RedwoodLink}
                to={to}
                my="12px"
                colorScheme={active ? 'secondary' : 'primary'}
                mx={1}
              >
                <Icon as={icon} fontSize="md" />
              </Button>
            </Flex>
          )}
        </Box>
      </Tooltip>
    </>
  )
}

export default SidebarItem
