/* eslint-disable react/jsx-key */
import React from 'react'

import { Td, Tr } from '@chakra-ui/react'
import Avatar from 'avataaars'
import { Row } from 'react-table'

import { UseTableReturnType } from '../hooks/useSortableTable'

type TableRowProps = {
  row: Row<UseTableReturnType>
}

const TableRow = ({ row, ...props }: TableRowProps) => {
  return (
    <Tr {...props}>
      {row.cells.map((cell) => {
        if (typeof cell.value === 'object') {
          const { __typename, ...avatarProps } = cell.value

          return (
            <Td {...cell.getCellProps()}>
              <Avatar
                style={{ width: 50, height: 50 }}
                avatarStyle="Circle"
                {...avatarProps}
              />
            </Td>
          )
        }
        const isPosition = cell.column.Header === 'Positie'
        return (
          <Td {...cell.getCellProps()} fontSize={isPosition ? 'xl' : 'md'}>
            {cell.render('Cell')}
          </Td>
        )
      })}
    </Tr>
  )
}

export default TableRow
