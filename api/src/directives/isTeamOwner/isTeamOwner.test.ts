import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import isTeamOwner from './isTeamOwner'

describe('isTeamOwner directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(isTeamOwner.schema).toBeTruthy()
    expect(getDirectiveName(isTeamOwner.schema)).toBe('isTeamOwner')
  })

  it('has a isTeamOwner throws an error if validation does not pass', () => {
    const mockExecution = mockRedwoodDirective(isTeamOwner, {
      context: {
        currentUser: {
          id: '1',
          email: 'bla@gmail.com',
          roles: ['USER'],
          verified: true,
          player: {
            id: '1',
            playerType: 'STAFF',
            teamId: '1',
          },
        },
      },
    })

    expect(mockExecution).toThrowError('Team niet gevonden')
  })
})
