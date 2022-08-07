import { render } from 'src/lib/testing/test-utils'

import BreadCrumbs from './BreadCrumbs'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BreadCrumbs', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BreadCrumbs />)
    }).not.toThrow()
  })
})
