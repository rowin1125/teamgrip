import React from 'react'

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth'

type PlayerIsStaffWrapperProps = {
  children: React.ReactElement
}

const PlayerIsStaffWrapper = ({ children }: PlayerIsStaffWrapperProps) => {
  const { isTeamPlayer, loading } = useTeamPlayerAuth()

  if (!loading && isTeamPlayer) return null

  return children || null
}

export default PlayerIsStaffWrapper
