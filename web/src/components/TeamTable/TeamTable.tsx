import { Table, TableProps } from '@chakra-ui/react'

import TableBody from './components/TeamTableBody'
import TableHead from './components/TeamTableHead'
import { TeamTableEntriesType, useTeamTable } from './hooks/useTeamTable'

export type TableLinkProps = {
  hrefPrefix: string
  buttonLabel: string
}

type TeamTableProps = {
  entries?: TeamTableEntriesType
  isLoading?: boolean
  loadingProps?: {
    loadingColumns: number
    loadingRows: number
  }
  hiddenColumns?: string[]
  theme?: 'dark' | 'light'
} & TableProps

const TeamTable = ({
  entries,
  hiddenColumns,
  theme = 'light',
  size = 'sm',
}: TeamTableProps) => {
  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useTeamTable(entries, hiddenColumns)

  return (
    <Table size={size} {...getTableProps()} mt={10}>
      <TableHead headerGroups={headerGroups} theme={theme} />
      <TableBody
        prepareRow={prepareRow}
        rows={rows}
        getTableBodyProps={getTableBodyProps}
      />
    </Table>
  )
}
export default TeamTable
