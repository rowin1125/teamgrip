import React from 'react';

import { Box, BoxProps, Image } from '@chakra-ui/react';

import footballNightMan from './images/footbal-night-man.jpg';
import stadiumImage from './images/stadium.jpg';

export type HeroProps = {
    type?: 'stadium' | 'football-night-man';
    size?: 'sm' | 'md' | 'lg' | '1/2' | 'full';
} & BoxProps;

const HERO_SIZES_MAP = {
    sm: '200px',
    md: '414px',
    lg: '600px',
    '1/2': '50vh',
    full: '100vh',
};

const Hero = ({ type = 'stadium', size = 'md', zIndex = '-1' }: HeroProps) => {
    const heightProperty = HERO_SIZES_MAP[size];
    let heroImage: string;

    switch (type) {
        case 'stadium':
            heroImage = stadiumImage;
            break;
        case 'football-night-man':
            heroImage = footballNightMan;
    }

    return (
        <Box
            h={heightProperty}
            bg="primary.500"
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={zIndex}
        >
            <Image
                filter="auto"
                blur="1px"
                brightness="0.8"
                src={heroImage}
                objectFit="cover"
                w="full"
                h="full"
            />
            <Box
                bg="primary.500"
                opacity={0.7}
                bgGradient="linear(to-tl, primary.600, gray.900)"
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
            />
        </Box>
    );
};

export default Hero;
