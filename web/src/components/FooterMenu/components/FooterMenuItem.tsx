import React, { forwardRef } from 'react'

import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import { useLocation } from '@redwoodjs/router'

import RedwoodLink from 'src/components/RedwoodLink'

type FooterMenuItemProps = {
  icon: IconType
  to?: string
  title: string
} & ButtonProps

export const FooterMenuItem = forwardRef<FooterMenuItemProps, any>(
  ({ icon: IconComponent, to, title, ...props }, ref) => {
    const { pathname } = useLocation()

    const isHomepage =
      title.toLocaleLowerCase() === 'dashboard' && pathname === '/app'
    const active =
      (pathname.includes(title.toLocaleLowerCase()) && !isHomepage) ||
      isHomepage

    return (
      <Button
        as={to ? RedwoodLink : 'button'}
        {...(to && { to })}
        my="12px"
        colorScheme={active ? 'secondary' : 'primary'}
        mx={1}
        ref={ref}
        {...props}
      >
        <Icon as={IconComponent} fontSize="lg" color="white" />
      </Button>
    )
  }
)

export default FooterMenuItem
