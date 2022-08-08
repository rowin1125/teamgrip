import React from 'react'

import { Grid, GridItem } from '@chakra-ui/react'

import ControlledSelect from 'src/components/forms/components/ControlledSelect'

import { avatarOptions } from '../../helpers/generateRandomAvatar'

const ExtraType = () => (
  <Grid templateColumns="repeat(4, 1fr)" gap={4}>
    <GridItem colSpan={{ base: 4, xl: 2 }}>
      <ControlledSelect
        m={0}
        id="skinColor"
        label="Huidskleur"
        options={avatarOptions.skinColor.map((option) => ({
          label: option,
          value: option,
        }))}
        placeholder="Selecteer"
      />
    </GridItem>
  </Grid>
)

export default ExtraType
