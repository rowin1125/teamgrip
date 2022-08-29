import { Table } from '@chakra-ui/react'

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
}

const TeamTable = ({ entries, hiddenColumns }: TeamTableProps) => {
  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useTeamTable(entries, hiddenColumns)

  return (
    <Table size="sm" {...getTableProps()} mt={10}>
      <TableHead headerGroups={headerGroups} />
      <TableBody
        prepareRow={prepareRow}
        rows={rows}
        getTableBodyProps={getTableBodyProps}
      />
    </Table>
  )
}
export default TeamTable
