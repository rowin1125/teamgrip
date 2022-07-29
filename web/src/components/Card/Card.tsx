import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

type CardProps = {
  children: React.ReactNode
  noXPadding?: boolean
} & BoxProps

const Card = ({ children, noXPadding, ...rest }: CardProps) => (
  <Box
    px={noXPadding ? 0 : 8}
    bg="white"
    py={8}
    rounded="3xl"
    boxShadow="lg"
    h="fit-content"
    {...rest}
  >
    {children}
  </Box>
)

export default Card
