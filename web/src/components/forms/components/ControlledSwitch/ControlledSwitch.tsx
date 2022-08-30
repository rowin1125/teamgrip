import React from 'react'

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Switch,
  SwitchProps,
} from '@chakra-ui/react'
import { useField } from 'formik'

type ControlledSwitchProps = {
  id: string
  switchProps?: SwitchProps
  labelProps?: FormLabelProps
  helperText?: string
} & FormControlProps

const ControlledSwitch = ({
  id,
  label,
  switchProps,
  labelProps,
  children,
  helperText,
  ...rest
}: ControlledSwitchProps) => {
  const [field, { error, touched }] = useField(id)

  return (
    <FormControl name={id} {...rest}>
      {label && (
        <FormLabel fontWeight="bold" htmlFor={id} {...labelProps}>
          {label}
        </FormLabel>
      )}
      <Switch
        {...field}
        id={id}
        isInvalid={!!error && touched}
        isChecked={field.value}
        display="flex"
        alignItems="center"
        {...switchProps}
      >
        {children}
      </Switch>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default ControlledSwitch
