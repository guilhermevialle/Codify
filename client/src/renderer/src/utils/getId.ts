export function getId(url: string | undefined) {
  if (!url) return undefined

  const id = url.split('/').pop()
  return id
}
