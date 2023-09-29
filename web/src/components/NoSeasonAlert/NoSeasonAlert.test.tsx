import { render } from '@redwoodjs/testing/web';

import NoSeasonAlert from './NoSeasonAlert';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NoSeasonAlert', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<NoSeasonAlert />);
        }).not.toThrow();
    });
});
