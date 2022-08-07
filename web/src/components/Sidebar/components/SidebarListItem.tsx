import React from 'react'

import { As, Flex, Link, ListIcon, ListItem, Text } from '@chakra-ui/react'

import { useLocation, Link as RedwoodLink } from '@redwoodjs/router'

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

type SidebarListItemProps = {
  listItem: string
  href: string
  icon: As
}

const SidebarListItem = ({
  listItem,
  href,
  icon: Icon,
}: SidebarListItemProps) => {
  const { pathname } = useLocation()

  const isHomepage = listItem === 'dashboard' && pathname === '/app'

  const active =
    (pathname.includes(listItem.toLocaleLowerCase()) && !isHomepage) ||
    isHomepage

  return (
    <Link as={RedwoodLink} to={href}>
      <ListItem
        m={0}
        w="216px"
        key={listItem}
        display="flex"
        alignItems="center"
        rounded="lg"
        transition="all 0.1s ease-in-out"
        p={4}
        _hover={{
          shadow: 'inner',
          cursor: 'pointer',
        }}
        shadow={active ? 'inner' : 'none'}
      >
        <Flex>
          <Flex
            bg={active ? 'primary.500' : undefined}
            justifyContent="center"
            alignItems="center"
            w="30px"
            h="30px"
            rounded="lg"
          >
            <ListIcon
              as={Icon}
              color={active ? 'white' : 'primary.500'}
              m={0}
            />
          </Flex>
          <Text ml={4} fontWeight="bold" color="black">
            {capitalizeText(listItem)}
          </Text>
        </Flex>
      </ListItem>
    </Link>
  )
}

export default SidebarListItem
