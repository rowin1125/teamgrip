/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

type FormContextType = {
  next: (values: Record<string, unknown>) => void;
  previous: (values: Record<string, unknown>) => void;
  setValidationSchema: (
    validationSchema: StepperForm.FormValidationSchemaType
  ) => void;
  activePage: number;
  amountOfPages: number;
  isLastPage: boolean;
};

export const FormContext = React.createContext<FormContextType>({
  activePage: 0,
  next: () => {},
  previous: () => {},
  setValidationSchema: () => {},
  isLastPage: false,
  amountOfPages: 0,
});
