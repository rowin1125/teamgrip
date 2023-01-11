import { useAuth } from '@redwoodjs/auth';

export const useTeamPlayerAuth = () => {
  const { currentUser, loading } = useAuth();
  const isTeamStaff =
    currentUser?.player?.playerType === 'STAFF' ||
    currentUser?.roles === 'ADMIN';
  const isActivePlayer = currentUser?.player?.isActivePlayer;

  return { currentUser, isTeamStaff, isActivePlayer, loading };
};
