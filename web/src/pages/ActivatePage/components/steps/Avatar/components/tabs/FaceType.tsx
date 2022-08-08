import React from 'react'

import { Grid, GridItem } from '@chakra-ui/react'

import ControlledSelect from 'src/components/forms/components/ControlledSelect'

import { avatarOptions } from '../../helpers/generateRandomAvatar'

const FaceType = () => (
  <Grid templateColumns="repeat(4, 1fr)" gap={4}>
    <GridItem colSpan={{ base: 4, xl: 2 }}>
      <ControlledSelect
        m={0}
        id="eyeType"
        label="Ogen"
        options={avatarOptions.eyeType.map((option) => ({
          label: option,
          value: option,
        }))}
        placeholder="Selecteer"
      />
    </GridItem>

    <GridItem colSpan={{ base: 4, xl: 2 }}>
      <ControlledSelect
        m={0}
        id="eyebrowType"
        label="Wenkbrouwen"
        options={avatarOptions.eyebrowType.map((option) => ({
          label: option,
          value: option,
        }))}
        placeholder="Selecteer"
      />
    </GridItem>

    <GridItem colSpan={{ base: 4, xl: 2 }}>
      <ControlledSelect
        m={0}
        id="mouthType"
        label="Mond"
        options={avatarOptions.mouthType.map((option) => ({
          label: option,
          value: option,
        }))}
        placeholder="Selecteer"
      />
    </GridItem>
  </Grid>
)

export default FaceType
