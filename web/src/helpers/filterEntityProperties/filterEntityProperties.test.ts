import { filterEntityProperties } from './filterEntityProperties';

const generateContract = (index: string) => {
  return {
    id: '',
    authorizationLevel: 'beperkt',
    clientId: index,
    backDelivery: false,
    managedByExternalTool: false,
    sellOption: false,
    notes: '',
    optionPeriod: {
      from: '2020-01-01',
      to: '2020-01-01',
    },
    product: 'electricity',
    supplierContractNumber: '',
    supplierId: '',
    unit: 'kWh',
    contractPeriod: {
      from: '2020-01-01',
      to: '2020-01-01',
    },
    servicePeriod: {
      from: '2020-01-01',
      to: '2020-01-01',
    },
  };
};

describe('filterEntityProperties()', () => {
  const contractArray = [1, 2, 3, 4].map((item) =>
    generateContract(item.toString())
  );

  test('should return the correct keys when provided', () => {
    const filteredSubContractsProperties = filterEntityProperties(
      contractArray,
      ['clientId']
    );

    expect(filteredSubContractsProperties).toEqual([
      { clientId: '1' },
      { clientId: '2' },
      { clientId: '3' },
      { clientId: '4' },
    ]);
  });

  test('should not have any keys inside the new array object which are not provided', () => {
    const filteredSubContractsProperties = filterEntityProperties(
      contractArray,
      ['id', 'product']
    );

    expect(filteredSubContractsProperties).not.toHaveProperty('backDelivery');
    expect(filteredSubContractsProperties).not.toHaveProperty(
      'managedByExternalTool'
    );
  });
});
