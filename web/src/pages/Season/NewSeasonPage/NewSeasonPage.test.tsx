import { render } from '@redwoodjs/testing/web';

import NewSeasonPage from './NewSeasonPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewSeasonPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<NewSeasonPage />);
        }).not.toThrow();
    });
});
