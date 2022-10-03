export const getMatchingObjectProperties = (
  baseObject: Record<string, unknown>,
  compareObject?: Record<string, unknown>
) => {
  if (!compareObject) return []

  const keys = Object.keys(baseObject)

  return keys.filter((key) => Object.keys(compareObject).includes(key))
}
