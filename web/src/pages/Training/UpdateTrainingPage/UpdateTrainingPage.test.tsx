import { render } from '@redwoodjs/testing/web';

import UpdateTrainingPage from './UpdateTrainingPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateTrainingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateTrainingPage />);
    }).not.toThrow();
  });
});
