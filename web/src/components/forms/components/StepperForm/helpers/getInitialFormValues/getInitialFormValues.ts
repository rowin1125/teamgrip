import { getMatchingObjectProperties } from './getMatchingObjectProperties'

export const getInitialFormValues = (
  pages: StepperForm.FormConfigType['pages'],
  apiInitialValues?: StepperForm.InitialFormValuesType
): Record<string, unknown> => {
  const initialValues = pages.reduce<StepperForm.InitialFormValuesType>(
    (prevValues, currentValues) => {
      return { ...prevValues, ...currentValues.initialValues }
    },
    {}
  )

  const matchingObjectProperties = getMatchingObjectProperties(
    initialValues,
    apiInitialValues
  )

  return {
    ...initialValues,
    ...matchingObjectProperties.reduce((prevValues, currentValues) => {
      return {
        ...prevValues,
        [currentValues]: apiInitialValues?.[currentValues],
      }
    }, {}),
  }
}
