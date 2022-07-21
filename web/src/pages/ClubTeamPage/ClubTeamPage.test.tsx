import { render } from '@redwoodjs/testing/web'

import ClubTeamPage from './ClubTeamPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ClubTeamPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClubTeamPage />)
    }).not.toThrow()
  })
})
