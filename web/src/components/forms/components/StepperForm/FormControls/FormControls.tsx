import React, { useContext } from 'react';

import { Button, Flex } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import { FormContext } from '../FormContext/FormContext';

import useTranslation from '@/hooks/useTranslation';
import formBase from '@/translations/backoffice/formBase';

const FormControls = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<StepperForm.FormValuesType>();
  const { activePage, previous, isLastPage } = useContext(FormContext);

  return (
    <Flex w="100%" justifyContent="flex-end" mt={8}>
      <Button
        mr={4}
        disabled={activePage === 0}
        onClick={() => previous(values)}
        type="button"
      >
        {t(formBase.back)}
      </Button>
      <div>
        <Button colorScheme="primary" type="submit">
          {isLastPage ? t(formBase.save) : t(formBase.next)}
        </Button>
      </div>
    </Flex>
  );
};

export default FormControls;
