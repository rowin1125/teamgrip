import { render } from '@redwoodjs/testing/web';

import TeamSettingsPage from './TeamSettingsPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TeamSettingsPage', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<TeamSettingsPage />);
        }).not.toThrow();
    });
});
