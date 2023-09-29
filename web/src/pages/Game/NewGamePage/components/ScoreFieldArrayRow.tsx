import { Button, Flex, Grid, GridItem, Heading, Icon } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { BiTrash } from 'react-icons/bi';
import {
    CreateGameInput,
    CreateScoreInput,
    GetPlayersForTeamQuery,
} from 'types/graphql';

import ControlledInput from 'src/components/forms/components/ControlledInput';
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

type FormikValues = {
    input: CreateGameInput;
    scores: CreateScoreInput[];
};
type ScoreFieldArrayRowProps = {
    index: number;
    players: GetPlayersForTeamQuery['playersForTeam'];
    score: CreateScoreInput;
    handleRemove: (
        currentPlayer: Record<string, unknown>,
        index: number
    ) => void;
};

const ScoreFieldArrayRow = ({
    index,
    players,
    score,
    handleRemove,
}: ScoreFieldArrayRowProps) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    const id = `scores.${index}.points`;
    const currentPlayer = players.find((item) => item?.id === score.playerId);
    const matchScorePointsOptions = [70, 80, 90, 100];

    const handleChangeCurrentPoints = (points: number) =>
        setFieldValue(id, points);

    return (
        <Grid
            templateColumns="repeat(12, 1fr)"
            gap={4}
            key={players[index]?.displayName}
        >
            <GridItem colSpan={{ base: 12, xl: 9 }}>
                <Flex
                    flexDirection={{ base: 'column', xl: 'column' }}
                    mb={{ base: 8, xl: 0 }}
                >
                    <ControlledInput
                        label={capitalizeText(currentPlayer?.displayName || '')}
                        labelProps={{ m: 0 }}
                        id={`scores.${index}.points`}
                        mr={2}
                        maxW={{ base: 'full', xl: '200px' }}
                        type="number"
                        formControlProps={{
                            mb: { base: 2, xl: 8 },
                            display: 'none',
                        }}
                    />
                    <Heading as="h3" fontSize="lg">
                        {capitalizeText(currentPlayer?.displayName || '')}
                    </Heading>

                    <Flex
                        pb={{ base: 0, xl: 6 }}
                        pt={{ base: 0, xl: 2 }}
                        ml={{ base: 0, xl: 0 }}
                    >
                        <Flex mt={2}>
                            {matchScorePointsOptions.map((item) => {
                                const currentPoints =
                                    values.scores[index].points;
                                const buttonIsActive = currentPoints === item;

                                return (
                                    <Button
                                        key={`${item}-${currentPlayer?.displayName}`}
                                        colorScheme="primary"
                                        variant={
                                            buttonIsActive ? 'solid' : 'outline'
                                        }
                                        onClick={() =>
                                            handleChangeCurrentPoints(item)
                                        }
                                        mx={1}
                                    >
                                        {item}
                                    </Button>
                                );
                            })}
                        </Flex>

                        {currentPlayer && (
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    handleRemove(currentPlayer, index)
                                }
                            >
                                <Icon as={BiTrash} color="red" />
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </GridItem>
        </Grid>
    );
};

export default ScoreFieldArrayRow;
