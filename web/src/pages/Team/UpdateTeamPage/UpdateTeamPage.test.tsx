import { render } from '@redwoodjs/testing/web';

import UpdateTeamPage from './UpdateTeamPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateTeamPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<UpdateTeamPage />);
        }).not.toThrow();
    });
});
