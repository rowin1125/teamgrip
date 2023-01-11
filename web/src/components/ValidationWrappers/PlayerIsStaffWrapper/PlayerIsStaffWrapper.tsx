import React from 'react';

import { useTeamPlayerAuth } from 'src/hooks/global/useTeamPlayerAuth';

type PlayerIsStaffWrapperProps = {
  children?: React.ReactElement | null;
};

const PlayerIsStaffWrapper = ({ children }: PlayerIsStaffWrapperProps) => {
  const { isTeamStaff, loading } = useTeamPlayerAuth();

  if (!loading && !isTeamStaff) return null;

  return children || null;
};

export default PlayerIsStaffWrapper;
