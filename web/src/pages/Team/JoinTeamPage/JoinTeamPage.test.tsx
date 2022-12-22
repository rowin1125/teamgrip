import { render } from '@redwoodjs/testing/web';

import JoinTeamPage from './JoinTeamPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('JoinTeamPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<JoinTeamPage />);
    }).not.toThrow();
  });
});
