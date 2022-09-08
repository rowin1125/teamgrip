import { render } from '@redwoodjs/testing/web'

import PlayerIsStaffWrapper from './PlayerIsStaffWrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PlayerIsStaffWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <PlayerIsStaffWrapper>
          <p>Hi</p>
        </PlayerIsStaffWrapper>
      )
    }).not.toThrow()
  })
})
