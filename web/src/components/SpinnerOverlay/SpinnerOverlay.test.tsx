import { render } from '@redwoodjs/testing/web';

import SpinnerOverlay from './SpinnerOverlay';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SpinnerOverlay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SpinnerOverlay />);
    }).not.toThrow();
  });
});
