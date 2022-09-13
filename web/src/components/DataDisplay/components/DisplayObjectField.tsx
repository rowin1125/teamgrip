import React from 'react'

import { Box } from '@chakra-ui/react'

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

import { ApiEntriesTypes } from '../DataDisplay'

import DataEntryToJsx from './DataEntryToJsx'

type DisplayObjectFieldProps = {
  objectKey: string
  value: ApiEntriesTypes
}

const DisplayObjectField = ({ objectKey, value }: DisplayObjectFieldProps) => (
  <>
    <Box w="40%" as="dt" color="gray.400" fontSize="sm">
      {capitalizeText(objectKey)}:
    </Box>
    <Box w="100%" as="dd">
      <DataEntryToJsx entry={value} isNested={true} />
    </Box>
  </>
)

export default DisplayObjectField
