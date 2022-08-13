export const handleTeamNameTransformation = (value: string) => {
  const transformedValue = value
    .replaceAll(' ', '-')
    .replace(/[^a-z0-9 -]/gi, '')
    .replaceAll(/[0-9]/gi, (matchedValue) => {
      return `-${matchedValue}`
    })

  const sanitizedValue = transformedValue.replaceAll('--', '-')

  return sanitizedValue
}
