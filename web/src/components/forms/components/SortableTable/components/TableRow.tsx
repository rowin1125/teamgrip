/* eslint-disable react/jsx-key */
import React from "react";

import { Td, Tr } from "@chakra-ui/react";
import { Row } from "react-table";

import { UseTableReturnType } from "../hooks/useSortableTable";
import { TableLinkProps } from "../SortableTable";

import LinkButton from "@/components/shared/LinkButton/LinkButton";

type TableRowProps = {
  row: Row<UseTableReturnType>;
  link?: TableLinkProps;
};

const TableRow = ({ row, link, ...props }: TableRowProps) => {
  const shouldRenderLink = !!link?.hrefPrefix || !!link?.buttonLabel;

  return (
    <Tr {...props}>
      {row.cells.map((cell) => (
        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
      ))}
      {shouldRenderLink && (
        <Td textAlign="end" borderTop="1px" borderTopColor="gray.100">
          <LinkButton href={`${link.hrefPrefix}/${row.values.id}`}>
            {link.buttonLabel}
          </LinkButton>
        </Td>
      )}
    </Tr>
  );
};

export default TableRow;
