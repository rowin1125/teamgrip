import { render } from 'src/lib/testing/test-utils';

import HomePage from './HomePage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />);
    }).not.toThrow();
  });
});
