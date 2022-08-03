import React from 'react'

import {
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

import ClotheType from './tabs/ClotheType'
import ExtraType from './tabs/ExtraType'
import FaceType from './tabs/FaceType'
import TopType from './tabs/TopType'

const AvatarFormFields = () => {
  return (
    <>
      <Tabs mt={8} variant="line" colorScheme="secondary">
        <TabList>
          <Tab>Bovenkant hoofd</Tab>
          <Tab>Kleding</Tab>
          <Tab>Gezicht</Tab>
          <Tab>Overig</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TopType />
          </TabPanel>
          <TabPanel>
            <ClotheType />
          </TabPanel>
          <TabPanel>
            <FaceType />
          </TabPanel>
          <TabPanel>
            <ExtraType />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AvatarFormFields
