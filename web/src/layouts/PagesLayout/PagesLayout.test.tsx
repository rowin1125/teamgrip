import { render } from '@redwoodjs/testing/web'

import PagesLayout from './PagesLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PagesLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PagesLayout />)
    }).not.toThrow()
  })
})
