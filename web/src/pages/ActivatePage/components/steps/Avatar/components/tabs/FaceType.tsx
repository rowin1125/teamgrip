import React from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

import ControlledSelect from 'src/components/forms/components/ControlledSelect';

import { avatarOptions } from '../../helpers/generateRandomAvatar';

const FaceType = () => (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 4, xl: 2 }}>
            <ControlledSelect
                m={0}
                id="eyeType"
                label="Ogen"
                options={Object.entries(avatarOptions.eyeType).map(
                    (option) => ({
                        label: option[1],
                        value: option[0],
                    })
                )}
                placeholder="Selecteer"
                reactSelectProps={{
                    isSearchable: false,
                }}
            />
        </GridItem>

        <GridItem colSpan={{ base: 4, xl: 2 }}>
            <ControlledSelect
                m={0}
                id="eyebrowType"
                label="Wenkbrouwen"
                options={Object.entries(avatarOptions.eyebrowType).map(
                    (option) => ({
                        label: option[1],
                        value: option[0],
                    })
                )}
                placeholder="Selecteer"
                reactSelectProps={{
                    isSearchable: false,
                }}
            />
        </GridItem>

        <GridItem colSpan={{ base: 4, xl: 2 }}>
            <ControlledSelect
                m={0}
                id="mouthType"
                label="Mond"
                options={Object.entries(avatarOptions.mouthType).map(
                    (option) => ({
                        label: option[1],
                        value: option[0],
                    })
                )}
                placeholder="Selecteer"
                reactSelectProps={{
                    isSearchable: false,
                }}
            />
        </GridItem>
    </Grid>
);

export default FaceType;
