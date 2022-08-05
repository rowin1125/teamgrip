import React from 'react'

import { useBreakpointValue } from '@chakra-ui/react'
import { StepProps, Step } from 'chakra-ui-steps'

type FormStepProps = {
  pageIndex: number
  amountOfPages: number
} & StepProps

const FormStep = ({ amountOfPages, pageIndex, ...props }: FormStepProps) => {
  const label =
    amountOfPages === pageIndex + 1 ? 'Klaar 🏆️' : `Stap ${pageIndex + 1}`
  const stepLabel = useBreakpointValue(
    {
      base: null,
      xl: label,
    },
    'base'
  )
  return (
    <Step label={stepLabel} key={pageIndex} m={0} className="step" {...props} />
  )
}

export default FormStep
