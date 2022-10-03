/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@chakra-ui/react'
import { Cell } from 'react-table'

import { UseTeamTableReturnType } from '../../hooks/useTeamTable'

type TableDataDefaultProps = {
  cell: Cell<UseTeamTableReturnType, any>
}

const TableDataDefault = ({ cell }: TableDataDefaultProps) => {
  return <Box fontSize="md">{cell.render('Cell')}</Box>
}

export default TableDataDefault
