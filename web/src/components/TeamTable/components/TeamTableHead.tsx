/* eslint-disable react/jsx-key */
import React from 'react'

import { Box, Icon, Th, Thead, Tr } from '@chakra-ui/react'
import { CgChevronDown, CgChevronUp } from 'react-icons/cg'
import { HeaderGroup } from 'react-table'

import PlayerIsStaffWrapper from 'src/components/ValidationWrappers/PlayerIsStaffWrapper/PlayerIsStaffWrapper'

import { UseTeamTableReturnType } from '../hooks/useTeamTable'

type TeamTableHeadProps = {
  headerGroups: HeaderGroup<UseTeamTableReturnType>[]
  theme: 'dark' | 'light'
  hiddenColumns?: string[]
  showActions?: boolean
}

const TeamTableHead = ({
  headerGroups,
  theme,
  hiddenColumns,
  showActions,
}: TeamTableHeadProps) => (
  <Thead>
    {headerGroups.map((headerGroup) => (
      <Tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => {
          if (
            hiddenColumns &&
            hiddenColumns.includes(column.Header.toString().toLocaleLowerCase())
          )
            return null
          return (
            <Th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              fontWeight="bold"
              fontSize="lg"
              textTransform="none"
              color={theme === 'dark' ? 'white' : 'primary.500'}
            >
              <Box as="span" display="flex">
                {column.render('Header')}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <Icon as={CgChevronDown} fontSize="md" ml={2} />
                  ) : (
                    <Icon as={CgChevronUp} fontSize="md" ml={2} />
                  )
                ) : null}
              </Box>
            </Th>
          )
        })}
        {showActions && (
          <PlayerIsStaffWrapper>
            <Th
              fontWeight="bold"
              fontSize="lg"
              textTransform="none"
              color={theme === 'dark' ? 'white' : 'primary.500'}
            >
              Acties
            </Th>
          </PlayerIsStaffWrapper>
        )}
      </Tr>
    ))}
  </Thead>
)

export default TeamTableHead
