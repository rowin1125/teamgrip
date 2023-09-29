import { render } from '@redwoodjs/testing/web';

import UpdateSeasonPage from './UpdateSeasonPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateSeasonPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<UpdateSeasonPage />);
        }).not.toThrow();
    });
});
