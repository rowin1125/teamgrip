import {
  Box,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from '@chakra-ui/react'
import { useField } from 'formik'

type ControlledDatePickerProps = {
  label: string
  helperText?: string
  id: string
  inline?: boolean
  labelProps?: FormLabelProps
  inputProps?: InputProps
} & FormControlProps

const ControlledDatePicker = ({
  id,
  label,
  helperText,
  labelProps,
  inline = false,
  inputProps,
  ...props
}: ControlledDatePickerProps) => {
  const [field, meta] = useField(id)
  const isInvalid = !!meta.error && !!meta.touched

  return (
    <FormControl isInvalid={isInvalid} w="full" {...props}>
      <Box
        display={inline ? 'inline' : 'flex'}
        alignItems="center"
        width="fulls"
      >
        <FormLabel
          htmlFor={id}
          {...labelProps}
          display="flex"
          fontWeight="bold"
        >
          {label}
        </FormLabel>

        <Box position="relative" w="full">
          <Input
            placeholder="Select Date and Time"
            type="date"
            id={id}
            {...inputProps}
            size="md"
            {...field}
          />
        </Box>
      </Box>
      {helperText && !isInvalid && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default ControlledDatePicker
