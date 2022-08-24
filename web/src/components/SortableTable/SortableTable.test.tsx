import { render } from '@redwoodjs/testing/web'

import SortableTable from './SortableTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SortableTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortableTable />)
    }).not.toThrow()
  })
})
