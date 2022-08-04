import React from 'react'

import {
  FormControl,
  FormControlProps,
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
  formControlProps?: FormControlProps
} & InputProps

const ControlledInput = ({
  label,
  helperText,
  id,
  labelProps,
  inputRightAddonText,
  inputLeftAddonText,
  fullWidth = true,
  formControlProps,
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
      {...formControlProps}
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
