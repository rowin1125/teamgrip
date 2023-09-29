import { useEffect } from 'react';

import { navigate, routes, useParams } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useGetTeamByInvitationToken } from 'src/hooks/api/query/useGetTeamByInvitationToken';

import { useGhostTeamInvitation } from '../../hooks/useGhostTeamInvitation';

import AcceptButtons from './components/AcceptButtons';
import AcceptIntroText from './components/AcceptIntroText';

const AcceptTeamInvitation = () => {
    const { ghostPlayer } = useGhostTeamInvitation();
    const { invitationToken } = useParams();

    const { team, loading: teamLoading } = useGetTeamByInvitationToken(
        invitationToken || ''
    );

    useEffect(() => {
        if (!teamLoading && !team) {
            toast.error('Geen team gevonden op basis van de uitnodiging');
            navigate(routes.app());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamLoading]);

    return (
        <>
            <AcceptIntroText team={team} ghostPlayer={ghostPlayer} />
            <AcceptButtons team={team} ghostPlayer={ghostPlayer} />
        </>
    );
};

export default AcceptTeamInvitation;
