/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

import { useParams } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';

type UseUnAuthenticatedType = {
    setTabIndex: (index: number) => void;
};

export const useUnAuthenticated = ({ setTabIndex }: UseUnAuthenticatedType) => {
    const { invitationToken, ghostInvitation } = useParams();

    const [loading, setLoading] = useState(false);
    const { logIn, signUp } = useAuth();

    useEffect(() => {
        if (invitationToken) return;

        toast.error('Je hebt geen uitnodigingstoken');
    }, [invitationToken]);

    const handleSignUp = async (data: any, actions: any) => {
        setLoading(true);
        const response = await signUp({
            ...data,
            invitationToken,
            ghostInvitation,
        });

        if (response.message) {
            toast.success(response.message);
            actions.resetForm();
            setTabIndex(0);
        } else if (response.error) {
            toast.error(response.error);
        }
        setLoading(false);
    };

    const handleSignIn = async (data: any) => {
        setLoading(true);
        const response = await logIn({ ...data });

        if (response.message) {
            toast(response.message);
        } else if (response.error) {
            toast.error(response.error);
        } else {
            toast.success('Welcome back 🥳');
        }
        setLoading(false);
    };

    return {
        handleSignIn,
        handleSignUp,
        loading,
    };
};
