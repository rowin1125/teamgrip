import { createMock } from 'ts-auto-mock';

import { getInitialFormValues } from './getInitialFormValues';

describe('getInitialFormValues()', () => {
  test('Should return initial form values for a single page', () => {
    const pagesConfig = createMock<StepperForm.FormConfigType>({
      pages: [
        {
          initialValues: {
            clientId: '123',
            supplierId: '',
            product: '',
            supplierContractNumber: '',
            unit: '',
          },
          default: () => '',
          title: '',
        },
      ],
    });

    const initialValues = getInitialFormValues(pagesConfig.pages);

    expect(initialValues.clientId).toEqual('123');
  });

  test('Should return initial form values for multiple pages', () => {
    const pagesConfig = createMock<StepperForm.FormConfigType>({
      pages: [
        {
          initialValues: {
            clientId: '123',
            supplierId: '',
            product: '',
            supplierContractNumber: '',
            unit: '',
          },
          default: () => '',
          title: '',
        },
        {
          initialValues: {
            notes: 'Some default note',
          },
          default: () => '',
          title: '',
        },
      ],
    });

    const initialValues = getInitialFormValues(pagesConfig.pages);

    expect(initialValues).toHaveProperty('notes', 'Some default note');
    expect(initialValues).toHaveProperty('clientId', '123');
  });

  test('Should return initial form values combined with existing data', () => {
    const pagesConfig = createMock<StepperForm.FormConfigType>({
      pages: [
        {
          initialValues: {
            clientId: '123',
            supplierId: '',
            product: '',
            supplierContractNumber: '',
            unit: '',
          },
          default: () => '',
          title: '',
        },
      ],
    });
    const data = {
      supplierId: '123',
      supplierContractNumber: '456',
    };

    const initialValues = getInitialFormValues(pagesConfig.pages, data);

    expect(initialValues).toHaveProperty('clientId', '123');
    expect(initialValues).toHaveProperty('supplierId', '123');
    expect(initialValues).toHaveProperty('supplierContractNumber', '456');
  });
});
