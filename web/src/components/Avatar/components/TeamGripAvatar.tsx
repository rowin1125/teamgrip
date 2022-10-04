/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import AvatarComponent from 'avataaars'
import { Avatar } from 'types/graphql'

type TeamGripAvatarProps = {
  size: string
  avatar: Omit<
    Avatar,
    '__typename' | 'createdAt' | 'updatedAt' | 'userId' | 'user'
  >
}

const TeamGripAvatar = ({
  size,
  avatar,
  ...additionalAvatarProps
}: TeamGripAvatarProps) => {
  const combinedAvatarProps = {
    ...avatar,
    ...additionalAvatarProps,
  }
  const { id, ...avatarProps } = combinedAvatarProps

  return (
    <AvatarComponent style={{ width: size, height: size }} {...avatarProps} />
  )
}

export default TeamGripAvatar
