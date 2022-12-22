/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@chakra-ui/react';
import { Cell } from 'react-table';

import { UseTeamTableReturnType } from '../../hooks/useTeamTable';

type TableDataRankProps = {
  cell: Cell<UseTeamTableReturnType, any>;
};

const TableDataRank = ({ cell }: TableDataRankProps) => {
  const topTree = {
    1: '🏆️',
    2: '🥈',
    3: '🥉',
  };
  const value = cell.value;
  const medal = topTree[value as keyof typeof topTree];

  const position = medal ? `${medal}` : ``;

  return (
    <Box fontSize="xl">
      {position} {cell.render('Cell')}
    </Box>
  );
};

export default TableDataRank;
