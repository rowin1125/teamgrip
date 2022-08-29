/* eslint-disable react/jsx-key */
import React from 'react'

import { Tbody } from '@chakra-ui/react'
import { Row, TableBodyPropGetter, TableCommonProps } from 'react-table'

import { UseTeamTableReturnType } from '../hooks/useTeamTable'

import TableRow from './TeamTableRow'

type TeamTableBodyProps = {
  rows: Row<UseTeamTableReturnType>[]
  prepareRow: (row: Row<UseTeamTableReturnType>) => void
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<UseTeamTableReturnType> | undefined
  ) => TableCommonProps
}

const TeamTableBody = ({
  rows,
  prepareRow,
  getTableBodyProps,
}: TeamTableBodyProps) => (
  <Tbody {...getTableBodyProps()}>
    {rows.map((row) => {
      prepareRow(row)

      return <TableRow row={row} {...row.getRowProps()} />
    })}
  </Tbody>
)

export default TeamTableBody
