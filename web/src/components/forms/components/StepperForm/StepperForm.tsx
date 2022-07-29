import React, { useState } from "react";

import { Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { FormContext } from "./FormContext/FormContext";
import { useStepperForm } from "./hooks/useStepperForm";
import FormControls from "./FormControls";

import FormProgress from "@/components/backoffice/forms/components/FormProgress";
import Card from "@/components/shared/Card";

type StepperFormProps = {
  onSubmit: (values: Record<string, unknown>) => void;
  pagesConfig: StepperForm.FormConfigType;
  initialValues?: Record<string, unknown>;
  pageProps?: Record<string, unknown>;
};

const StepperForm = ({
  pagesConfig: { pages },
  onSubmit,
  initialValues,
  pageProps,
}: StepperFormProps) => {
  const [validationSchema, setValidationSchema] =
    useState<StepperForm.FormValidationSchemaType>();

  const {
    activePageConfig,
    snapshot,
    activePage,
    amountOfPages,
    isLastPage,
    next,
    previous,
    handleSubmit,
  } = useStepperForm({
    pages,
    onSubmit,
    initialValues,
  });

  const FormPage = activePageConfig.default;

  return (
    <FormContext.Provider
      value={{
        next,
        previous,
        activePage,
        amountOfPages,
        isLastPage,
        setValidationSchema,
      }}
    >
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <>
          <FormProgress />
          <Card mt={20}>
            {activePageConfig.title && (
              <Heading mb={8} as="h1">
                {activePageConfig.title}
              </Heading>
            )}
            <Form>
              <FormPage {...pageProps} />
              <FormControls />
            </Form>
          </Card>
        </>
      </Formik>
    </FormContext.Provider>
  );
};

export default StepperForm;
