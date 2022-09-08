import React from 'react'

import Avatar from 'avataaars'
import { Cell } from 'react-table'

import GhostAvatar from 'src/components/GhostAvatar/GhostAvatar'

import { UseTeamTableReturnType } from '../../hooks/useTeamTable'

type TableDataAvatarProps = {
  cell: Cell<UseTeamTableReturnType, any>
  size?: 'sm' | 'md' | 'lg'
}

const TableDataAvatar = ({ cell, size }: TableDataAvatarProps) => {
  const { __typename, ...avatarProps } = cell.value || {}

  const sizes = {
    sm: 37.5,
    md: 50,
    lg: 67.5,
  }

  return (
    <>
      {cell.value ? (
        <Avatar
          style={{ width: sizes[size], height: sizes[size] }}
          avatarStyle="Circle"
          {...avatarProps}
        />
      ) : (
        <GhostAvatar w={sizes[size]} h={sizes[size]} />
      )}
    </>
  )
}

export default TableDataAvatar
