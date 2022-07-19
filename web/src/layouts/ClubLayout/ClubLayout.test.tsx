import { render } from '@redwoodjs/testing/web'

import ClubLayout from './ClubLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ClubLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClubLayout />)
    }).not.toThrow()
  })
})
