import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

type CardProps = {
  children: React.ReactNode;
  noXPadding?: boolean;
  bg?: BoxProps['bg'];
} & BoxProps;

const Card = ({ children, noXPadding, bg = 'white', ...rest }: CardProps) => (
  <Box
    px={noXPadding ? 0 : 8}
    position="relative"
    bg={bg}
    py={8}
    rounded="2xl"
    boxShadow="lg"
    {...rest}
  >
    {children}
  </Box>
);

export default Card;
