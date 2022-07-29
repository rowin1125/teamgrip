import { Table } from "@chakra-ui/react";

import TableBody from "./components/TableBody";
import TableHead from "./components/TableHead";
import { TableEntriesType, useSortableTable } from "./hooks/useSortableTable";

import LoadingTable from "@/components/shared/LoadingSkelets/LoadingTable";

export type TableLinkProps = {
  hrefPrefix: string;
  buttonLabel: string;
};

type SortableTableProps = {
  entries?: TableEntriesType;
  isLoading?: boolean;
  link?: TableLinkProps;
  loadingProps?: {
    loadingColumns: number;
    loadingRows: number;
  };
};

const SortableTable = ({
  entries,
  isLoading,
  link,
  loadingProps: { loadingColumns, loadingRows } = {
    loadingColumns: 3,
    loadingRows: 10,
  },
}: SortableTableProps) => {
  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useSortableTable(entries);

  if (isLoading || !entries)
    return (
      <LoadingTable loadingColumns={loadingColumns} loadingRows={loadingRows} />
    );

  return (
    <Table {...getTableProps()} mt={10}>
      <TableHead headerGroups={headerGroups} />
      <TableBody
        prepareRow={prepareRow}
        rows={rows}
        getTableBodyProps={getTableBodyProps}
        link={link}
      />
    </Table>
  );
};
export default SortableTable;
