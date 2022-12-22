import { Box, Flex, Heading, Image } from '@chakra-ui/react';

import { routes } from '@redwoodjs/router';

import RedwoodLink from '../RedwoodLink';

import ProfileMenu from './components/PagesHeaderProfileMenu';

const PagesHeader = () => {
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
          <ProfileMenu />
        </Flex>
      </Flex>
    </Box>
  );
};

export default PagesHeader;
