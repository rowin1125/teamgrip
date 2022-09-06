import React from 'react'

import Avatar from 'avataaars'
import { Cell } from 'react-table'

import GhostAvatar from 'src/components/GhostAvatar/GhostAvatar'

import { UseTeamTableReturnType } from '../../hooks/useTeamTable'

type TableDataAvatarProps = {
  cell: Cell<UseTeamTableReturnType, any>
}

const TableDataAvatar = ({ cell }: TableDataAvatarProps) => {
  const { __typename, ...avatarProps } = cell.value || {}

  return (
    <>
      {cell.value ? (
        <Avatar
          style={{ width: 50, height: 50 }}
          avatarStyle="Circle"
          {...avatarProps}
        />
      ) : (
        <GhostAvatar w="50px" h="50px" />
      )}
    </>
  )
}

export default TableDataAvatar
