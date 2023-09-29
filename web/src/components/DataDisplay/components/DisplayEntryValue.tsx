import React from 'react';

import { Box } from '@chakra-ui/react';

type DisplayEntryValueProps = {
    label: string;
    value: string | boolean | number;
    isNested: boolean;
};

const DisplayEntryValue = ({
    label,
    value,
    isNested,
}: DisplayEntryValueProps) => (
    <>
        <Box
            w="40%"
            as="dt"
            pr={4}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            pl={isNested ? 4 : 0}
            fontSize="sm"
            fontWeight="semibold"
        >
            {label}:
        </Box>
        <Box w="60%" as="dd">
            {value?.toString()}
        </Box>
    </>
);

export default DisplayEntryValue;
