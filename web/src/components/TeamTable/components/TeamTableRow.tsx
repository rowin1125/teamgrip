/* eslint-disable react/jsx-key */
import React from 'react'

import { Box, Td, Tr } from '@chakra-ui/react'
import Avatar from 'avataaars'
import { Row } from 'react-table'

import GhostAvatar from 'src/components/GhostAvatar/GhostAvatar'

import { UseTeamTableReturnType } from '../hooks/useTeamTable'

type TeamTableRowProps = {
  row: Row<UseTeamTableReturnType>
}

const TeamTableRow = ({ row, ...props }: TeamTableRowProps) => {
  return (
    <Tr {...props}>
      {row.cells.map((cell) => {
        if (typeof cell.value === 'object' || cell.column.Header === 'Avatar') {
          const { __typename, ...avatarProps } = cell.value || {}

          return (
            <Td {...cell.getCellProps()}>
              <Box>
                {cell.value ? (
                  <Avatar
                    style={{ width: 50, height: 50 }}
                    avatarStyle="Circle"
                    {...avatarProps}
                  />
                ) : (
                  <GhostAvatar w="50px" h="50px" />
                )}
              </Box>
            </Td>
          )
        }
        const isPosition = cell.column.Header === 'Positie'
        return (
          <Td {...cell.getCellProps()} fontSize={isPosition ? 'xl' : 'md'}>
            {cell.render('Cell')}
          </Td>
        )
      })}
    </Tr>
  )
}

export default TeamTableRow
