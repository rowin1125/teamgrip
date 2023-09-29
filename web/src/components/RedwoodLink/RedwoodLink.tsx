/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

import { Link } from '@redwoodjs/router';

type RedwoodLinkProps = { to: string } & ChakraLinkProps;

const RedwoodLink = React.forwardRef<RedwoodLinkProps, RedwoodLinkProps>(
    ({ ...props }, ref) => {
        return <ChakraLink ref={ref} as={Link} {...props}></ChakraLink>;
    }
);

export default RedwoodLink;
