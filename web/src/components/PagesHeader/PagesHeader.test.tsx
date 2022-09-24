import { render } from 'src/lib/testing/test-utils'

import Header from './PagesHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Header', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Header />)
    }).not.toThrow()
  })
})
