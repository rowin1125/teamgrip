import { Flex, FlexProps } from '@chakra-ui/react'
import { StepProps, Steps, StepsProps } from 'chakra-ui-steps'

import FormStep from './FormStep'

type FormProgressProps = {
  activePage: number
  amountOfPages: number
  stepsProps?: StepsProps
  stepProps?: StepProps
} & FlexProps

const FormProgress = ({
  activePage,
  amountOfPages,
  stepProps,
  stepsProps,
  ...props
}: FormProgressProps) => {
  const greaterThanTwo = amountOfPages > 2

  return (
    <Flex justifyContent="center" w="100%" {...props}>
      <Steps
        activeStep={activePage}
        colorScheme="secondary"
        maxW={greaterThanTwo ? '100%' : '66%'}
        {...stepsProps}
      >
        {[...Array(amountOfPages).keys()].map((pageIndex) => (
          <FormStep
            key={pageIndex}
            pageIndex={pageIndex}
            amountOfPages={amountOfPages}
            {...stepProps}
          />
        ))}
      </Steps>
    </Flex>
  )
}

export default FormProgress
