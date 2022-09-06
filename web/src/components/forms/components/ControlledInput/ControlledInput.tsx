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
  transformValue?: (value: string) => string
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
  maxW,
  transformValue,
  ...props
}: ControlledInputProps) => {
  const [{ onChange, ...field }, meta, { setValue }] = useField(id)
  const isInvalid = !!meta.error && meta.touched

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (transformValue) {
      setValue(transformValue(e.target.value), true)
      return
    }
    onChange(e)
  }

  return (
    <FormControl
      isInvalid={isInvalid}
      mb={8}
      maxW={maxW || (fullWidth ? null : 80)}
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
          bg="gray.50"
          color="black"
          onChange={handleOnChange}
          {...field}
          {...props}
        />
        {inputRightAddonText && (
          <InputRightAddon>{inputRightAddonText}</InputRightAddon>
        )}
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default ControlledInput
