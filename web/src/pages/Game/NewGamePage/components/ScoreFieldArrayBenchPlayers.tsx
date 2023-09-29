import React from 'react';

import { Box, Button, Icon } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

import TextAlert from 'src/components/TextAlert/TextAlert';

type ScoreFieldArrayBenchPlayersProps = {
    benchPlayers: {
        __typename: 'Player' | undefined;
        displayName: string | null | undefined;
        id: string | undefined;
    }[];
    handlePush: (playerId: string) => void;
};

const ScoreFieldArrayBenchPlayers = ({
    benchPlayers,
    handlePush,
}: ScoreFieldArrayBenchPlayersProps) => {
    const hasBenchPlayers = benchPlayers?.length > 0;

    if (!hasBenchPlayers)
        return (
            <TextAlert status="info" mb={8}>
                Alle spelers nemen deel aan de wedstrijd ✅
            </TextAlert>
        );

    return (
        <Box mb={4}>
            <TextAlert my={4} status="warning">
                Deze spelers zullen absent worden gemeld voor deze wedstrijd
            </TextAlert>
            {benchPlayers.map((benchPlayer) => (
                <Button
                    key={benchPlayer?.id}
                    colorScheme="secondary"
                    mr={4}
                    mb={4}
                    onClick={() => handlePush(benchPlayer?.id || '')}
                >
                    <Icon as={FaPlus} mr={2} />
                    {benchPlayer?.displayName}
                </Button>
            ))}
        </Box>
    );
};

export default ScoreFieldArrayBenchPlayers;
