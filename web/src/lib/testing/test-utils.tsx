import React, { FC, ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';

import { MockProviders } from '@redwoodjs/testing/web';

import { theme } from 'src/lib/theme/theme';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MockProviders>
        <AllTheProviders>{children}</AllTheProviders>
      </MockProviders>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
