import React from 'react'

import { Grid, GridItem } from '@chakra-ui/react'
import { useFormikContext } from 'formik'

import ControlledSelect from 'src/components/forms/components/ControlledSelect'

import { avatarOptions } from '../../helpers/generateRandomAvatar'

const TopType = () => {
  const { values } = useFormikContext<Record<string, string>>()

  const disableaccessoriesType = values.topType === 'eyePatch'
  const disableFacialHairColor = values.facialHairType === 'Blank'
  const disableHairColor = [
    'LongHairShavedSides',
    'LongHairFrida',
    'WinterHat4',
    'NoHair',
    'Hijab',
    'Hat',
    'Eyepatch',
  ].includes(values.topType)
  const showHatColor = [
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'Turban',
    'Hijab',
  ].includes(values.topType)

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      <GridItem colSpan={2}>
        <ControlledSelect
          m={0}
          id="topType"
          label="Haar / hoed"
          options={avatarOptions.topType.map((option) => ({
            label: option,
            value: option,
          }))}
          placeholder="Selecteer"
        />
      </GridItem>
      {!disableaccessoriesType && (
        <GridItem colSpan={2}>
          <ControlledSelect
            m={0}
            id="accessoriesType"
            label="Accessoires"
            options={avatarOptions.accessoriesType.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Selecteer"
          />
        </GridItem>
      )}
      {!disableHairColor && (
        <GridItem colSpan={2}>
          <ControlledSelect
            m={0}
            id="hairColor"
            label="Haar kleur"
            options={avatarOptions.hairColor.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Selecteer"
          />
        </GridItem>
      )}

      {showHatColor && (
        <GridItem colSpan={2}>
          <ControlledSelect
            m={0}
            id="hatColor"
            label="Hoed kleur"
            options={avatarOptions.hatColor.map((option) => ({
              label: option,
              value: option,
            }))}
            placeholder="Selecteer"
          />
        </GridItem>
      )}
      <GridItem colSpan={2}>
        <ControlledSelect
          m={0}
          id="facialHairType"
          label="Baard"
          options={avatarOptions.facialHairType.map((option) => ({
            label: option,
            value: option,
          }))}
          placeholder="Selecteer"
        />
      </GridItem>
      {!disableFacialHairColor && (
        <GridItem colSpan={2}>
          <ControlledSelect
            m={0}
            id="facialHairColor"
            label="baard kleur"
            options={avatarOptions.facialHairColor.map((option) => ({
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

export default TopType
