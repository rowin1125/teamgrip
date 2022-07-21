import { render } from '@redwoodjs/testing/web'

import ClubTeam from './ClubTeam'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClubTeam', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClubTeam />)
    }).not.toThrow()
  })
})
