/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Td, Box } from '@chakra-ui/react';
import { Cell, Row } from 'react-table';

import RedwoodLink from 'src/components/RedwoodLink';

import { UseTeamTableReturnType } from '../hooks/useTeamTable';

import TableDataAvatar from './TableDataComponents/TableDataAvatar';
import TableDataDefault from './TableDataComponents/TableDataDefault';
import TableDataRank from './TableDataComponents/TableDataRank';

type TableDataMachineProps = {
    cell: Cell<UseTeamTableReturnType, any>;
    routes?: {
        detail?: (params?: any) => string;
        update?: (params?: any) => string;
    };
    row: Row<UseTeamTableReturnType>;
    hiddenColumns?: string[];
    size?: 'sm' | 'md' | 'lg';
};

const TableDataMachine = ({
    cell,
    routes,
    row,
    hiddenColumns,
    size,
}: TableDataMachineProps) => {
    const headerTitle =
        cell?.column?.Header?.toString()?.toLocaleLowerCase() || '';
    if (hiddenColumns && hiddenColumns.includes(headerTitle)) return null;

    let TableDataComponent;
    switch (headerTitle) {
        case 'avatar':
            TableDataComponent = TableDataAvatar;
            break;

        case 'rank':
            TableDataComponent = TableDataRank;
            break;

        default:
            TableDataComponent = TableDataDefault;
            break;
    }

    const TdChildComponent = routes?.detail ? RedwoodLink : 'div';
    const tdChildProps = routes?.detail
        ? { to: routes?.detail({ id: row.values?.id }) }
        : {};

    return (
        <Td {...cell.getCellProps()}>
            <Box as={TdChildComponent} {...tdChildProps}>
                <TableDataComponent cell={cell} size={size} />
            </Box>
        </Td>
    );
};

export default TableDataMachine;
