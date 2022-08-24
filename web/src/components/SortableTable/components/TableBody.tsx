/* eslint-disable react/jsx-key */
import React from 'react'

import { Tbody } from '@chakra-ui/react'
import { Row, TableBodyPropGetter, TableCommonProps } from 'react-table'

import { UseTableReturnType } from '../hooks/useSortableTable'

import TableRow from './TableRow'

type TableBodyProps = {
  rows: Row<UseTableReturnType>[]
  prepareRow: (row: Row<UseTableReturnType>) => void
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<UseTableReturnType> | undefined
  ) => TableCommonProps
}

const TableBody = ({ rows, prepareRow, getTableBodyProps }: TableBodyProps) => (
  <Tbody {...getTableBodyProps()}>
    {rows.map((row) => {
      prepareRow(row)

      return <TableRow row={row} {...row.getRowProps()} />
    })}
  </Tbody>
)

export default TableBody
