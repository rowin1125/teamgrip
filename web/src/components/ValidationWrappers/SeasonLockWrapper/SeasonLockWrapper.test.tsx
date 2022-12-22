import { render } from '@redwoodjs/testing/web';

import SeasonLockWrapper from './SeasonLockWrapper';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SeasonLockWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <SeasonLockWrapper>
          <p>Hi</p>
        </SeasonLockWrapper>
      );
    }).not.toThrow();
  });
});
