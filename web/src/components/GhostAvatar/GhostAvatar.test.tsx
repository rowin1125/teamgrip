import { render } from '@redwoodjs/testing/web';

import GhostAvatar from './GhostAvatar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GhostAvatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GhostAvatar />);
    }).not.toThrow();
  });
});
