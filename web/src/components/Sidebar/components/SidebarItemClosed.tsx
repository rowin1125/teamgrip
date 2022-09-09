import React from 'react'

import { Flex, Button, Icon } from '@chakra-ui/react'

import RedwoodLink from 'src/components/RedwoodLink'

type SidebarItemClosedProps = {
  navOpen: boolean
  title: string
  active: boolean
  to: string
  icon: React.ElementType
}

const SidebarItemClosed = ({
  active,
  icon,

  to,
}: SidebarItemClosedProps) => {
  return (
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
  )
}

export default SidebarItemClosed
