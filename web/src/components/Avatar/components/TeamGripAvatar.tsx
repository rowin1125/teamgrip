/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import AvatarComponent from 'avataaars';
import { AvatarFragment } from 'types/graphql';

type TeamGripAvatarProps = {
    size: string;
    avatar: AvatarFragment['avatar'];
};

const TeamGripAvatar = ({
    size,
    avatar,
    ...additionalAvatarProps
}: TeamGripAvatarProps) => {
    const combinedAvatarProps = {
        ...avatar,
        ...additionalAvatarProps,
    };

    return (
        <AvatarComponent
            style={{ width: `${size}px`, height: `${size}px` }}
            avatarStyle={avatar?.avatarStyle || 'Circle'}
            {...combinedAvatarProps}
        />
    );
};

export default TeamGripAvatar;
