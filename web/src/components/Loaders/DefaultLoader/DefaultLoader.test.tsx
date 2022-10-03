import { render } from '@redwoodjs/testing/web'

import DefaultLoader from './DefaultLoader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DefaultLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DefaultLoader />)
    }).not.toThrow()
  })
})
