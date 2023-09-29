import { render } from '@redwoodjs/testing/web';

import TeamTable from './TeamTable';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TeamTable', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<TeamTable />);
        }).not.toThrow();
    });
});
