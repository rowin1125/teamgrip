import React from "react";

import { Column, useSortBy, useTable } from "react-table";

import { capitalizeText } from "@/helpers/textHelpers/capitalizeText/capitalizeText";
import useTranslation from "@/hooks/useTranslation";
import table from "@/translations/backoffice/table";

export type TableEntriesType =
  | Partial<Api.Contract>[]
  | Partial<Api.Client>[]
  | undefined;
export type UseTableReturnType = Partial<Api.Contract> | Partial<Api.Client>;

export const useSortableTable = (entries: TableEntriesType) => {
  const { t } = useTranslation();
  const rawColumns: Record<"Header" | "accessor", string>[] = [];

  for (const dataRow of entries || []) {
    const keys = Object.keys(dataRow);
    keys.forEach((key) => {
      if (rawColumns.find((header) => header.accessor === key)) return;

      const translationKey = `tableHeader${capitalizeText(
        key
      )}` as keyof typeof table;

      rawColumns.push({
        Header: t(table[translationKey]),
        accessor: key,
      });
    });
  }

  const columns = React.useMemo(
    () => rawColumns,
    [entries]
  ) as Column<UseTableReturnType>[];
  const data = React.useMemo(() => entries || [], [entries]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<UseTableReturnType>({ columns, data }, useSortBy);

  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  };
};
