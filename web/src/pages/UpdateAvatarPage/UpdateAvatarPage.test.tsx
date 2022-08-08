import { render } from '@redwoodjs/testing/web'

import UpdateAvatarPage from './UpdateAvatarPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateAvatarPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateAvatarPage />)
    }).not.toThrow()
  })
})
