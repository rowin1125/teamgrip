/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableProps } from '@chakra-ui/react'

import TableLoader from '../Loaders/TableLoader/TableLoader'

import NoEntries from './components/NoEntries'
import TableBody from './components/TeamTableBody'
import TableHead from './components/TeamTableHead'
import { TeamTableEntriesType, useTeamTable } from './hooks/useTeamTable'

export type TableLinkProps = {
  hrefPrefix: string
  buttonLabel: string
}

type TeamTableProps = Omit<TableProps, 'size'> & {
  entries?: TeamTableEntriesType
  isLoading?: boolean
  loadingProps?: {
    loadingColumns: number
    loadingRows: number
  }
  hiddenColumns?: string[]
  theme?: 'dark' | 'light'
  routes?: {
    detail?: (params?: any) => string
    update?: (params?: any) => string
  }
  showActions?: boolean
  onDelete?: (id: string) => Promise<void>
  size?: 'sm' | 'md' | 'lg'
}

const TeamTable = ({
  entries,
  hiddenColumns,
  theme = 'dark',
  size = 'md',
  routes,
  onDelete,
  showActions,
  isLoading,
}: TeamTableProps) => {
  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useTeamTable(entries)

  const tableHasRows = rows.length > 0

  return (
    <TableLoader isLoading={isLoading} theme={theme}>
      {tableHasRows && (
        <Table size={size} {...getTableProps()} mt={10}>
          <TableHead
            headerGroups={headerGroups}
            theme={theme}
            hiddenColumns={hiddenColumns}
            showActions={showActions}
          />
          <TableBody
            size={size}
            routes={routes}
            theme={theme}
            prepareRow={prepareRow}
            rows={rows}
            getTableBodyProps={getTableBodyProps}
            hiddenColumns={hiddenColumns}
            showActions={showActions}
            onDelete={onDelete}
          />
        </Table>
      )}
      {entries && !tableHasRows && <NoEntries />}
    </TableLoader>
  )
}
export default TeamTable
