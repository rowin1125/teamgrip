import React from 'react'

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'

import { useGetBreadCrumbs } from './hooks/useGetBreadCrumbs'

export type BreadCrumbsProps = {
  breadCrumbLabelOverride?: string
}

const BreadCrumbs = ({ breadCrumbLabelOverride }: BreadCrumbsProps) => {
  const { breadCrumbs, subTitle } = useGetBreadCrumbs()

  return (
    <>
      <Breadcrumb spacing="8px" separator="/" color="gray.200">
        <BreadcrumbItem>
          <BreadcrumbLink href="/app">{"Pagina's"}</BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumbs?.map((breadCrumb) => (
          <BreadcrumbItem key={breadCrumb.href}>
            <BreadcrumbLink href={breadCrumb.href}>
              {breadCrumb.breadCrumb}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
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
