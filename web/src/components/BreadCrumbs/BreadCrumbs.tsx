import React from 'react';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';

import RedwoodLink from '../RedwoodLink';

import { useGetBreadCrumbs } from './hooks/useGetBreadCrumbs';
import { truncateText } from 'src/helpers/textHelpers/truncateText/truncateText';

export type BreadCrumbsProps = {
  breadCrumbLabelOverride?: string;
};

const BreadCrumbs = ({ breadCrumbLabelOverride }: BreadCrumbsProps) => {
  const { breadCrumbs, subTitle } = useGetBreadCrumbs();

  return (
    <>
      <Breadcrumb
        spacing="8px"
        separator="/"
        color="gray.200"
        overflowX="auto"
        maxW={{ base: '40vw', xl: 'auto' }}
        display="flex"
        flexDirection="row"
      >
        {breadCrumbs?.map((breadCrumb, index) => {
          const isActive = breadCrumbs.length === index + 1;

          return (
            <BreadcrumbItem key={breadCrumb.href} mx={0}>
              <BreadcrumbLink
                as={RedwoodLink}
                to={breadCrumb.href}
                isCurrentPage={isActive}
              >
                {truncateText(breadCrumb.breadCrumb, 15)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <Box mt={1} maxW={{ base: '40vw', xl: 'auto' }}>
        <Text
          fontWeight="bold"
          color="white"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {breadCrumbLabelOverride || subTitle}
        </Text>
      </Box>
    </>
  );
};

export default BreadCrumbs;
