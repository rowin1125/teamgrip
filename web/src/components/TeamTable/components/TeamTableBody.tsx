/* eslint-disable react/jsx-key */

import { Tbody, Td, Tr } from '@chakra-ui/react'
import { Row, TableBodyPropGetter, TableCommonProps } from 'react-table'

import PlayerIsStaffWrapper from 'src/components/ValidationWrappers/PlayerIsStaffWrapper/PlayerIsStaffWrapper'

import { UseTeamTableReturnType } from '../hooks/useTeamTable'

import TableDataMachine from './TableDataMachine'
import TeamTableActionButtons from './TeamTableActionButtons'

type TeamTableBodyProps = {
  rows: Row<UseTeamTableReturnType>[]
  prepareRow: (row: Row<UseTeamTableReturnType>) => void
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<UseTeamTableReturnType> | undefined
  ) => TableCommonProps
  routes?: {
    detail: (params?: any) => string
    update: (params?: any) => string
  }
  onDelete?: (id: string) => Promise<void>
  hiddenColumns?: string[]
  showActions?: boolean
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const TeamTableBody = ({
  rows,
  routes,
  hiddenColumns,
  prepareRow,
  getTableBodyProps,
  showActions,
  onDelete,
  size,
}: TeamTableBodyProps) => {
  return (
    <Tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row)

        return (
          <Tr {...row.getRowProps()}>
            {row.cells.map((cell) => (
              <TableDataMachine
                key={cell.column.Header.toString()}
                cell={cell}
                row={row}
                hiddenColumns={hiddenColumns}
                routes={routes}
                size={size}
              />
            ))}
            {showActions && (
              <PlayerIsStaffWrapper>
                <Td>
                  <TeamTableActionButtons
                    routes={routes}
                    id={row.values?.id}
                    onDelete={onDelete}
                  />
                </Td>
              </PlayerIsStaffWrapper>
            )}
          </Tr>
        )
      })}
    </Tbody>
  )
}

export default TeamTableBody
