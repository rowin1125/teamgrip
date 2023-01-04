import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { CgBell } from 'react-icons/cg';

import { useAuth } from '@redwoodjs/auth';
import { Link, routes, useLocation } from '@redwoodjs/router';

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import RedwoodLink from '../RedwoodLink';

import ProfileMenu from './components/ProfileMenu';

const Header = () => {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();
  const showBreadCrumbs = pathname.includes('app');

  return (
    <Box as="header" w="full" pl={{ xl: 8 }} pb={4}>
      <Grid
        gridTemplateColumns={{ base: 'repeat(4, 1fr)', xl: 'repeat(4, 1fr)' }}
        alignItems="center"
      >
        <GridItem colSpan={2} display={{ base: 'none', xl: 'block' }}>
          {showBreadCrumbs && <BreadCrumbs />}
        </GridItem>

        <GridItem colSpan={1} display={{ base: 'block', xl: 'none' }}>
          {showBreadCrumbs && (
            <RedwoodLink to={currentUser ? routes.app() : routes.home()}>
              <Image src="/TeamGrip Logo.png" w={'70px'} h="auto" />
            </RedwoodLink>
          )}
        </GridItem>

        <GridItem colSpan={{ base: 3, xl: 2 }} alignSelf="flex-end">
          <Flex justifyContent="flex-end" alignItems="center">
            <StyledIconButton
              mx={{ base: 2, xl: 8 }}
              aria-label="Notifications"
              variant="ghost"
              icon={<Icon as={CgBell} color="white" fontSize="2xl" />}
            />
            {currentUser ? (
              <ProfileMenu />
            ) : (
              <Button
                as={Link}
                to={routes.login()}
                variant="solid"
                colorScheme="gray"
                minWidth={120}
              >
                Inloggen
              </Button>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

const StyledIconButton = styled(IconButton)`
  &:hover {
    svg {
      color: ${(props) => props.theme.colors.primary[500]};
    }
  }
`;

export default Header;
