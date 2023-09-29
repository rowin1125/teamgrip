import React from 'react';

import AvatarFrame, { Props } from 'avataaars';
import { useFormikContext } from 'formik';

const Avatar = () => {
    const { values } = useFormikContext();

    return (
        <AvatarFrame
            style={{ width: '200px', height: '200px' }}
            {...(values as Props)}
        />
    );
};

export default Avatar;
