import { Box, Fade, Table } from '@chakra-ui/react'

import SpinnerOverlay from 'src/components/SpinnerOverlay/SpinnerOverlay'
import TeamTableBody from 'src/components/TeamTable/components/TeamTableBody'
import TeamTableHead from 'src/components/TeamTable/components/TeamTableHead'
import { useTeamTable } from 'src/components/TeamTable/hooks/useTeamTable'

import { tableLoadingData } from './tableLoadingData'

type TableLoaderProps = {
  children?: React.ReactNode
  isLoading: boolean
  theme?: 'dark' | 'light'
}

const TableLoader = ({ children, isLoading, theme }: TableLoaderProps) => {
  const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } =
    useTeamTable(tableLoadingData)

  return (
    <Box>
      <Fade in={isLoading}>
        {isLoading && (
          <SpinnerOverlay theme={theme}>
            <Table size={'sm'} {...getTableProps()} mt={10}>
              <TeamTableHead headerGroups={headerGroups} theme={theme} />
              <TeamTableBody
                size={'sm'}
                theme={theme}
                prepareRow={prepareRow}
                rows={rows}
                getTableBodyProps={getTableBodyProps}
              />
            </Table>
          </SpinnerOverlay>
        )}
      </Fade>
      <Fade in={!isLoading}>{!isLoading && children}</Fade>
    </Box>
  )
}

export default TableLoader
