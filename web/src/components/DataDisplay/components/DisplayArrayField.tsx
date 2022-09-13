import React from 'react'

import { Box } from '@chakra-ui/react'
import { nanoid } from 'nanoid'

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText'

import { ApiEntriesTypes } from '../DataDisplay'

import DataEntryToJsx from './DataEntryToJsx'

type DisplayArrayFieldsProps = {
  entry: ApiEntriesTypes[]
  objectKey: string
}

const DisplayArrayFields = ({ entry, objectKey }: DisplayArrayFieldsProps) => (
  <Box w="100%" as="dd">
    <Box color="gray.400" fontSize="sm">
      {capitalizeText(objectKey)}:
    </Box>
    {entry?.map((item) => (
      <DataEntryToJsx key={nanoid()} entry={item} isNested={true} />
    ))}
  </Box>
)

export default DisplayArrayFields
