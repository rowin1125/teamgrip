import React from 'react'

import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

import { Link } from '@redwoodjs/router'

type RedwoodLinkProps = { to: string } & ChakraLinkProps

const RedwoodLink = ({ ...props }: RedwoodLinkProps) => {
  return <ChakraLink as={Link} {...props}></ChakraLink>
}

export default RedwoodLink
