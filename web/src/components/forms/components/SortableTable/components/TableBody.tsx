/* eslint-disable react/jsx-key */
import React from "react";

import { Tbody } from "@chakra-ui/react";
import { Row, TableBodyPropGetter, TableCommonProps } from "react-table";

import { UseTableReturnType } from "../hooks/useSortableTable";
import { TableLinkProps } from "../SortableTable";
import TableRow from "./TableRow";

type TableBodyProps = {
  rows: Row<UseTableReturnType>[];
  prepareRow: (row: Row<UseTableReturnType>) => void;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<UseTableReturnType> | undefined
  ) => TableCommonProps;
  link?: TableLinkProps;
};

const TableBody = ({
  rows,
  prepareRow,
  getTableBodyProps,
  link,
}: TableBodyProps) => (
  <Tbody {...getTableBodyProps()}>
    {rows.map((row) => {
      prepareRow(row);

      return <TableRow row={row} link={link} {...row.getRowProps()} />;
    })}
  </Tbody>
);

export default TableBody;
