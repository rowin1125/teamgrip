import { useState } from 'react';

import { useSteps } from 'chakra-ui-steps';
import { FormikHelpers } from 'formik';

import { getInitialFormValues } from '../helpers/getInitialFormValues/getInitialFormValues';

type UseStepperFormType = {
  pages: StepperForm.FormConfigType['pages'];
  onSubmit: (values: StepperForm.FormValuesType) => void;
  initialValues?: Record<string, unknown>;
};

export const useStepperForm = ({
  pages,
  onSubmit,
  initialValues: apiInitialValues,
}: UseStepperFormType) => {
  const {
    nextStep,
    prevStep,
    activeStep: activePage,
  } = useSteps({
    initialStep: 0,
  });
  const initialValues = getInitialFormValues(pages, apiInitialValues);

  const [snapshot, setSnapshot] = useState(initialValues);
  const activePageConfig = pages[activePage];
  const amountOfPages = pages.length;
  const isLastPage = activePage === amountOfPages - 1;

  const next = (values: StepperForm.FormValuesType) => {
    setSnapshot(values);
    nextStep();
  };

  const previous = (values: StepperForm.FormValuesType) => {
    setSnapshot(values);
    prevStep();
  };

  const handleSubmit = async (
    values: StepperForm.FormValuesType,
    formikHelpers: FormikHelpers<Record<string, unknown>>
  ) => {
    if (isLastPage) {
      return onSubmit(values);
    }

    formikHelpers.setTouched({});
    next(values);
  };

  return {
    activePageConfig,
    snapshot,
    activePage,
    amountOfPages,
    isLastPage,
    next,
    previous,
    handleSubmit,
  };
};
