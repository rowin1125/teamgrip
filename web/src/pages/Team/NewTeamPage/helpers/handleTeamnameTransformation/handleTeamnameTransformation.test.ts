import { handleTeamNameTransformation } from './handleTeamnameTransformation'

describe('handleTeamNameTransformation()', () => {
  it.each([
    ['Zaterdag 1', 'Zaterdag-1'],
    ['Zaterdag JO17 2', 'Zaterdag-JO-1-7-2'],
    ['Zondag', 'Zondag'],
    ['Zondag@!*#&*&*^!$#!', 'Zondag'],
    ['Zaterdag !#&*^^*#7', 'Zaterdag-7'],
  ])('Total of volumes %s and %s is %s', (volumeA, expectedResult) => {
    const result = handleTeamNameTransformation(volumeA)
    expect(expectedResult).toEqual(result)
  })
})
