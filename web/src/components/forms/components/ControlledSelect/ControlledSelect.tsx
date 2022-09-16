/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import {
  Box,
  Box as ChakraSelect,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  SelectProps,
  Text,
} from '@chakra-ui/react'
import { FieldInputProps, FieldMetaProps, useField } from 'formik'
import Select, { Props } from 'react-select'

import { customSelectStyles } from './customSelectStyles'

type ControlledSelectProps = SelectProps & {
  label: string
  helperText?: string
  id: string
  options: Record<'value' | 'label', string>[]
  onChangeCallback?: (
    value: string | number,
    field: FieldInputProps<any>,
    meta: FieldMetaProps<any>
  ) => void
  hiddenOptions?: Record<'id' | 'value', string | number>[]
  reactSelectProps?: Props
} & FormControlProps

const ControlledSelect = ({
  id,
  helperText,
  label,
  placeholder,
  options,
  onChangeCallback,
  hiddenOptions,
  reactSelectProps,
  ...props
}: ControlledSelectProps) => {
  const [searchInput, setSearchInput] = React.useState(false)
  const [field, meta, { setTouched, setValue }] = useField(id)
  const isInvalid = !!meta.error && !!meta.touched

  const handleOnChange = (option: any) => {
    setValue(option?.value, true)
    onChangeCallback?.(option?.value, field, meta)
  }

  if (!options) return null

  return (
    <FormControl isInvalid={isInvalid} mb={8} {...props}>
      <FormLabel fontWeight="bold" htmlFor={id}>
        {label}
      </FormLabel>
      <Box position="relative">
        {!meta.value && placeholder && !searchInput && (
          <Text
            pointerEvents="none"
            position="absolute"
            left={4}
            top={2}
            color="gray.400"
            zIndex={1}
          >
            {placeholder}
          </Text>
        )}
        <ChakraSelect
          as={Select}
          id={id}
          instanceId={id}
          options={options}
          defaultValue={meta.initialValue}
          classNamePrefix="custom-select"
          value={{
            value: field.value,
            label: options.find((option) => option.value === field.value)
              ?.label,
          }}
          onBlur={() => setTouched(true)}
          onInputChange={(inputValue: string) => setSearchInput(!!inputValue)}
          borderColor={isInvalid ? 'red.500' : ''}
          borderWidth={isInvalid ? '2px' : '0px'}
          borderRadius={isInvalid ? 'md' : 'none'}
          styles={customSelectStyles}
          isOptionDisabled={(option: any) => {
            if (!hiddenOptions) return false

            return !!hiddenOptions.find((item) => item.value === option.value)
          }}
          {...reactSelectProps}
          placeholder={'custom placeholder component'}
          onChange={handleOnChange}
        />
      </Box>
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default ControlledSelect
