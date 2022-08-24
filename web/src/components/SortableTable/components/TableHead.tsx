/* eslint-disable react/jsx-key */
import React from 'react'

import { Box, Icon, Th, Thead, Tr } from '@chakra-ui/react'
import { CgChevronDown, CgChevronUp } from 'react-icons/cg'
import { HeaderGroup } from 'react-table'

import { UseTableReturnType } from '../hooks/useSortableTable'

type TableHeadProps = {
  headerGroups: HeaderGroup<UseTableReturnType>[]
}

const TableHead = ({ headerGroups }: TableHeadProps) => (
  <Thead>
    {headerGroups.map((headerGroup) => (
      <Tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <Th
            {...column.getHeaderProps(column.getSortByToggleProps())}
            fontWeight="bold"
            fontSize="lg"
            textTransform="none"
            color="white"
          >
            <Box as="span" display="flex">
              {column.render('Header')}
              {column.isSorted ? (
                column.isSortedDesc ? (
                  <Icon as={CgChevronDown} fontSize="md" ml={2} />
                ) : (
                  <Icon as={CgChevronUp} fontSize="md" ml={2} />
                )
              ) : null}
            </Box>
          </Th>
        ))}
      </Tr>
    ))}
  </Thead>
)

export default TableHead
