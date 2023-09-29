export const handleTeamNameTransformation = (value: string) => {
    const transformedValue = value
        .replaceAll(' ', '-')
        .replace(/[^a-z0-9 -]/gi, '')
        .replaceAll(/[0-9]/gi, (matchedValue) => {
            const lastCharLetter = value[value.length - 2];
            const lastCharIsLetter = /[a-z]/gi.test(lastCharLetter);

            return !lastCharIsLetter ? matchedValue : `-${matchedValue}`;
        });

    const sanitizedValue = transformedValue.replaceAll('--', '-');

    return sanitizedValue;
};
