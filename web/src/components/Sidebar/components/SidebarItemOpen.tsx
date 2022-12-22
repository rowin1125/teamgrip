import React from 'react';

import { Button, Flex, Icon, IconProps } from '@chakra-ui/react';
import { CgChevronRight } from 'react-icons/cg';
import { RiMenuUnfoldLine } from 'react-icons/ri';

import RedwoodLink from 'src/components/RedwoodLink';

type SidebarItemOpenProps = {
  to: string;
  title: string;
  icon: React.ElementType;
  active: boolean;
  hasChildren: boolean;
  iconProps?: IconProps;
};

const SidebarItemOpen = ({
  to,
  title,
  icon,
  active,
  iconProps,
  hasChildren,
}: SidebarItemOpenProps) => {
  return (
    <Button
      as={RedwoodLink}
      to={to}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={4}
      py={8}
      w="full"
      bg={active ? 'primary.500' : ''}
      color={active ? 'white' : 'primary.500'}
      borderRight="4px solid"
      borderRightColor={active ? 'secondary.500' : 'transparent'}
      borderRadius={0}
      _hover={{
        bg: active ? 'primary.600' : 'primary.50',
      }}
      _active={{
        bg: active ? 'primary.800' : 'primary.100',
      }}
    >
      <Flex alignItems="center">
        <Icon as={icon} mr={4} {...iconProps} />
        {title}
      </Flex>
      {hasChildren ? (
        <Icon as={RiMenuUnfoldLine} ml={4} />
      ) : (
        <Icon as={CgChevronRight} ml={4} />
      )}
    </Button>
  );
};

export default SidebarItemOpen;
