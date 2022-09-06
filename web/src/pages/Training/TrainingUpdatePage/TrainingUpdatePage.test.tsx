import { render } from '@redwoodjs/testing/web'

import TrainingUpdatePage from './TrainingUpdatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TrainingUpdatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TrainingUpdatePage />)
    }).not.toThrow()
  })
})
