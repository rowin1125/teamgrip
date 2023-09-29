/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';

import { Table, Tbody, Td, Tr } from '@chakra-ui/react';

import NoEntries from 'src/components/TeamTable/components/NoEntries';
import TableDataMachine from 'src/components/TeamTable/components/TableDataMachine';
import TeamTableHead from 'src/components/TeamTable/components/TeamTableHead';
import {
    TeamTableEntriesType,
    useTeamTable,
} from 'src/components/TeamTable/hooks/useTeamTable';

import TeamPlayerSettingsActionButtons from './TeamPlayerSettingsActionButtons';

type TeamPlayerSettingsTableProps = {
    entries?: TeamTableEntriesType;
    onDelete?: (id: string) => Promise<void>;
};

const TeamPlayerSettingsTable = ({
    entries,
    onDelete,
}: TeamPlayerSettingsTableProps) => {
    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        prepareRow,
        rows,
        setSortBy,
    } = useTeamTable(entries);

    useEffect(() => {
        setSortBy([{ id: 'naam', desc: false }]);
    }, [setSortBy, entries]);

    if (!entries || rows.length === 0) return <NoEntries />;
    const hiddenColumns = ['id'];

    return (
        <Table size="sm" {...getTableProps()} mt={10}>
            <TeamTableHead
                theme="light"
                headerGroups={headerGroups}
                showActions
                hiddenColumns={hiddenColumns}
            />
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    if (!onDelete) return null;

                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <TableDataMachine
                                    key={cell?.column?.Header?.toString()}
                                    cell={cell}
                                    row={row}
                                    size="md"
                                    hiddenColumns={hiddenColumns}
                                />
                            ))}
                            <Td>
                                <TeamPlayerSettingsActionButtons
                                    onDelete={onDelete}
                                    row={row.values}
                                    entries={entries}
                                />
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default TeamPlayerSettingsTable;
