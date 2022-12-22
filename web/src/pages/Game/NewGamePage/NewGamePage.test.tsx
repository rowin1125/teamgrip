import { render } from '@redwoodjs/testing/web';

import NewGamePage from './NewGamePage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewGamePage />);
    }).not.toThrow();
  });
});
