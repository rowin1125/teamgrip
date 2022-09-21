import { render } from '@redwoodjs/testing/web'

import ChartHasDataWrapper from './ChartHasDataWrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChartHasDataWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChartHasDataWrapper />)
    }).not.toThrow()
  })
})
