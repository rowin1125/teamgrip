import React from 'react'

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'

import RedwoodLink from '../RedwoodLink'

import { useGetBreadCrumbs } from './hooks/useGetBreadCrumbs'

export type BreadCrumbsProps = {
  breadCrumbLabelOverride?: string
}

const BreadCrumbs = ({ breadCrumbLabelOverride }: BreadCrumbsProps) => {
  const { breadCrumbs, subTitle } = useGetBreadCrumbs()

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
          const isActive = breadCrumbs.length === index + 1

          return (
            <BreadcrumbItem key={breadCrumb.href}>
              <BreadcrumbLink
                as={RedwoodLink}
                to={breadCrumb.href}
                isCurrentPage={isActive}
              >
                {breadCrumb.breadCrumb}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </Breadcrumb>
      <Box mt={1}>
        <Text fontWeight="bold" color="white">
          {breadCrumbLabelOverride || subTitle}
        </Text>
      </Box>
    </>
  )
}

export default BreadCrumbs
