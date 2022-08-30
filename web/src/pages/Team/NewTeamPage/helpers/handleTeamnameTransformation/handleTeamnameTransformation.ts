export const handleTeamNameTransformation = (value: string) => {
  const transformedValue = value
    .replaceAll(' ', '-')
    .replace(/[^a-z0-9 -]/gi, '')
    .replaceAll(/[0-9]/gi, (matchedValue) => {
      const value = Number(matchedValue)
      const isNumber = typeof value === 'number'

      return isNumber ? matchedValue : `-${matchedValue}`
    })

  const sanitizedValue = transformedValue.replaceAll('--', '-')

  return sanitizedValue
}
