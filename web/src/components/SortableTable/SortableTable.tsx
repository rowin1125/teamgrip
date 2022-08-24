import { Table } from '@chakra-ui/react'

import TableBody from './components/TableBody'
import TableHead from './components/TableHead'
import { TableEntriesType, useSortableTable } from './hooks/useSortableTable'

export type TableLinkProps = {
  hrefPrefix: string
  buttonLabel: string
}

type SortableTableProps = {
  entries?: TableEntriesType
  isLoading?: boolean
  loadingProps?: {
    loadingColumns: number
    loadingRows: number
  }
  hiddenColumns?: string[]
}

const SortableTable = ({ entries, hiddenColumns }: SortableTableProps) => {
  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useSortableTable(entries, hiddenColumns)

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
export default SortableTable
