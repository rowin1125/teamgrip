import { useContext, useEffect } from 'react'

import { FormContext } from '../components/StepperForm/FormContext'

export const useSetFormikValidationContext = (
  validationSchema: StepperForm.FormValidationSchemaType
) => {
  const { setValidationSchema } = useContext(FormContext)

  useEffect(() => {
    setValidationSchema(validationSchema)
  }, [setValidationSchema, validationSchema])
}
