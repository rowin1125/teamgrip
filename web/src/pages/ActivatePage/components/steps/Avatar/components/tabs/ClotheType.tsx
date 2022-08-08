import React from 'react'

import { Grid, GridItem } from '@chakra-ui/react'
import { useFormikContext } from 'formik'

import ControlledSelect from 'src/components/forms/components/ControlledSelect'

import { avatarOptions } from '../../helpers/generateRandomAvatar'

const ClotheType = () => {
  const { values } = useFormikContext<Record<string, string>>()

  const disableGraphic = ['GraphicShirt'].includes(values.clotheType)
  const disableClotheColor = ['BlazerShirt', 'BlazerSweater'].includes(
    values.clotheType
  )

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      {
        <GridItem colSpan={{ base: 4, xl: 2 }}>
          <ControlledSelect
            m={0}
            id="clotheType"
            label="Kleding"
            options={avatarOptions.clotheType.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Selecteer"
          />
        </GridItem>
      }
      {!disableClotheColor && (
        <GridItem colSpan={{ base: 4, xl: 2 }}>
          <ControlledSelect
            m={0}
            id="clotheColor"
            label="Kleding kleur"
            options={avatarOptions.clotheColor.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Selecteer"
          />
        </GridItem>
      )}
      {disableGraphic && (
        <GridItem colSpan={{ base: 4, xl: 2 }}>
          <ControlledSelect
            m={0}
            id="graphicType"
            label="Symbool"
            options={avatarOptions.graphicType.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Selecteer"
          />
        </GridItem>
      )}
    </Grid>
  )
}

export default ClotheType
