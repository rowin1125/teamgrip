import { render } from '@redwoodjs/testing/web'

import ChartLoader from './ChartLoader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChartLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChartLoader />)
    }).not.toThrow()
  })
})
