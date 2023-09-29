import { handleTeamNameTransformation } from './handleTeamnameTransformation';

describe('handleTeamNameTransformation()', () => {
    it.each([
        ['Zaterdag 1', 'Zaterdag-1'],
        ['Zaterdag JO17-2', 'Zaterdag-JO17-2'],
        ['Zondag', 'Zondag'],
        ['Zondag@!*#&*&*^!$#!', 'Zondag'],
        ['Zaterdag !#&*^^*#7', 'Zaterdag-7'],
    ])('Total of volumes %s and %s is %s', (stringValue, expectedResult) => {
        const result = handleTeamNameTransformation(stringValue);
        expect(expectedResult).toEqual(result);
    });
});
