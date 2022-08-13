import { render } from '@redwoodjs/testing/web'

import NewTeamPage from './NewTeamPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewTeamPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTeamPage />)
    }).not.toThrow()
  })
})
