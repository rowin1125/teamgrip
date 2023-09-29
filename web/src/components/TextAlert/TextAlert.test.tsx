import { render } from 'src/lib/testing/test-utils';

import TextAlert from './TextAlert';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextAlert', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<TextAlert status="info">Hallo</TextAlert>);
        }).not.toThrow();
    });
});
