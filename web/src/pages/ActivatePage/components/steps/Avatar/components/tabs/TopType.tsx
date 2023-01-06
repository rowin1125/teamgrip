import React from 'react';

import { Grid, GridItem } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import ControlledSelect from 'src/components/forms/components/ControlledSelect';

import { avatarOptions } from '../../helpers/generateRandomAvatar';

const TopType = () => {
  const { values } = useFormikContext<Record<string, string>>();

  const disableaccessoriesType = values.topType === 'eyePatch';
  const disableFacialHairColor = values.facialHairType === 'Blank';
  const disableHairColor = [
    'LongHairShavedSides',
    'LongHairFrida',
    'WinterHat4',
    'NoHair',
    'Hijab',
    'Hat',
    'Eyepatch',
  ].includes(values.topType);
  const showHatColor = [
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'Turban',
    'Hijab',
  ].includes(values.topType);

  const hairColorMap = {};

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      <GridItem colSpan={{ base: 4, xl: 2 }}>
        <ControlledSelect
          m={0}
          id="topType"
          label="Haar / hoed"
          options={Object.entries(avatarOptions.topType).map((option) => ({
            label: option[1],
            value: option[0],
          }))}
          placeholder="Selecteer"
          reactSelectProps={{
            isSearchable: false,
          }}
        />
      </GridItem>
      {!disableaccessoriesType && (
        <GridItem colSpan={{ base: 4, xl: 2 }}>
          <ControlledSelect
            m={0}
            id="accessoriesType"
            label="Accessoires"
            options={Object.entries(avatarOptions.accessoriesType).map(
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
      )}
      {!disableHairColor && (
        <GridItem colSpan={{ base: 4, xl: 2 }}>
          <ControlledSelect
            m={0}
            id="hairColor"
            label="Haar kleur"
            options={Object.entries(avatarOptions.hairColor).map((option) => ({
              label: option[1],
              value: option[0],
            }))}
            placeholder="Selecteer"
            reactSelectProps={{
              isSearchable: false,
            }}
          />
        </GridItem>
      )}

      {showHatColor && (
        <GridItem colSpan={{ base: 4, xl: 2 }}>
          <ControlledSelect
            m={0}
            id="hatColor"
            label="Hoed kleur"
            options={Object.entries(avatarOptions.hatColor).map((option) => ({
              label: option[1],
              value: option[0],
            }))}
            placeholder="Selecteer"
            reactSelectProps={{
              isSearchable: false,
            }}
          />
        </GridItem>
      )}
      <GridItem colSpan={{ base: 4, xl: 2 }}>
        <ControlledSelect
          m={0}
          id="facialHairType"
          label="Baard"
          options={Object.entries(avatarOptions.facialHairType).map(
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
      {!disableFacialHairColor && (
        <GridItem colSpan={{ base: 4, xl: 2 }}>
          <ControlledSelect
            m={0}
            id="facialHairColor"
            label="baard kleur"
            options={Object.entries(avatarOptions.facialHairColor).map(
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
      )}
    </Grid>
  );
};

export default TopType;
