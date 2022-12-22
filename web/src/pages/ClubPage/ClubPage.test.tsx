import { render } from '@redwoodjs/testing/web';

import ClubPage from './ClubPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ClubPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClubPage />);
    }).not.toThrow();
  });
});
