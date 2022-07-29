import React, { useContext } from "react";

import { Flex } from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";

import { FormContext } from "../StepperForm/FormContext";

import useTranslation from "@/hooks/useTranslation";
import formBase from "@/translations/backoffice/formBase";

const FormProgress = () => {
  const { activePage, amountOfPages } = useContext(FormContext);
  const { t } = useTranslation();
  const greaterThanTwo = amountOfPages > 2;

  return (
    <Flex justifyContent="center">
      <Steps
        activeStep={activePage}
        colorScheme="secondary"
        maxW={greaterThanTwo ? "100%" : "66%"}
      >
        {[...Array(amountOfPages).keys()].map((pageIndex) => (
          <Step
            label={`${t(formBase.step)} ${pageIndex + 1}`}
            key={pageIndex}
            className="step"
          />
        ))}
      </Steps>
    </Flex>
  );
};

export default FormProgress;
