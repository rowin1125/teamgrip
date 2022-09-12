import { render } from '@redwoodjs/testing/web'

import GameDetailPage from './GameDetailPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GameDetailPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GameDetailPage />)
    }).not.toThrow()
  })
})
