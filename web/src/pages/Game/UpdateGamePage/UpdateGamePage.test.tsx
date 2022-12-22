import { render } from '@redwoodjs/testing/web';

import UpdateGamePage from './UpdateGamePage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateGamePage />);
    }).not.toThrow();
  });
});
