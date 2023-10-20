import { render } from '@redwoodjs/testing/web';

import PlayerDetailPage from './PlayerDetailPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PlayerDetailPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<PlayerDetailPage />);
        }).not.toThrow();
    });
});
