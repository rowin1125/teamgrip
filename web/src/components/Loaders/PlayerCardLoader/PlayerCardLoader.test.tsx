import { render } from '@redwoodjs/testing/web'

import PlayerCardLoader from './PlayerCardLoader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PlayerCardLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlayerCardLoader />)
    }).not.toThrow()
  })
})
