import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

type CardProps = {
  children: React.ReactNode
  noXPadding?: boolean
} & BoxProps

const Card = ({ children, noXPadding, ...rest }: CardProps) => (
  <Box
    px={noXPadding ? 0 : 8}
    position="relative"
    bg="white"
    py={8}
    rounded="2xl"
    boxShadow="lg"
    h="full"
    {...rest}
  >
    {children}
  </Box>
)

export default Card
