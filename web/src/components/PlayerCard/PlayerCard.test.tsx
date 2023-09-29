import { render } from '@redwoodjs/testing/web';

import PlayerCard from './PlayerCard';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PlayerCard', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<PlayerCard />);
        }).not.toThrow();
    });
});
