import React from 'react'

import { Flex, FlexProps } from '@chakra-ui/react'
import { Step, Steps } from 'chakra-ui-steps'

type FormProgressProps = {
  activePage: number
  amountOfPages: number
} & FlexProps

const FormProgress = ({
  activePage,
  amountOfPages,
  ...props
}: FormProgressProps) => {
  const greaterThanTwo = amountOfPages > 2

  return (
    <Flex justifyContent="center" w="100%" {...props}>
      <Steps
        activeStep={activePage}
        colorScheme="secondary"
        maxW={greaterThanTwo ? '100%' : '66%'}
      >
        {[...Array(amountOfPages).keys()].map((pageIndex) => {
          const label =
            amountOfPages === pageIndex + 1
              ? 'Klaar 🏆️'
              : `Stap ${pageIndex + 1}`
          return <Step label={label} key={pageIndex} className="step" />
        })}
      </Steps>
    </Flex>
  )
}

export default FormProgress
