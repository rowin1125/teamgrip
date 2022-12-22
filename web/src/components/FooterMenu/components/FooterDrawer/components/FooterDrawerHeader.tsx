import React from 'react';

import { DrawerHeader, Heading, Image } from '@chakra-ui/react';

const FooterDrawerHeader = () => (
  <DrawerHeader
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDir="column"
  >
    <Image src="/TeamGrip Logo.png" w={'100px'} h="auto" />
    <Heading mt={4} fontSize="4xl" color="white">
      TeamGrip
    </Heading>
  </DrawerHeader>
);

export default FooterDrawerHeader;
