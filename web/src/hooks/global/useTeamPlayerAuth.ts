import { useAuth } from 'src/auth';

export const useTeamPlayerAuth = () => {
    const { currentUser, loading } = useAuth();
    const isTeamStaff = currentUser?.player?.playerType === 'STAFF';
    const isTeamPlayer = currentUser?.player?.playerType === 'PLAYER';
    const isActivePlayer = currentUser?.player?.isActivePlayer;

    return { currentUser, isTeamStaff, isTeamPlayer, isActivePlayer, loading };
};
