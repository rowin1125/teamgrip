import React from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
} from '@chakra-ui/react'
import { useField } from 'formik'

type ControlledInputProps = {
  label?: string
  helperText?: string
  id: string
  labelProps?: FormLabelProps
  inputRightAddonText?: string
  inputLeftAddonText?: string
  fullWidth?: boolean
} & InputProps

const ControlledInput = ({
  label,
  helperText,
  id,
  labelProps,
  inputRightAddonText,
  inputLeftAddonText,
  fullWidth = true,
  ...props
}: ControlledInputProps) => {
  const [field, meta] = useField(id)
  const isInvalid = !!meta.error && meta.touched

  return (
    <FormControl
      isInvalid={isInvalid}
      mb={8}
      maxW={fullWidth ? null : 80}
      w="full"
    >
      {label && (
        <FormLabel fontWeight="bold" htmlFor={id} {...labelProps}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {inputLeftAddonText && (
          <InputLeftAddon>{inputLeftAddonText}</InputLeftAddon>
        )}
        <Input
          colorScheme="messenger"
          id={id}
          type="text"
          {...field}
          {...props}
        />
        {inputRightAddonText && (
          <InputRightAddon>{inputRightAddonText}</InputRightAddon>
        )}
      </InputGroup>
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default ControlledInput
