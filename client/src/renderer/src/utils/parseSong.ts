type Song = {
  title: string
  author: string
}

export function parseSong(input: string): Song {
  const authorRegex = /^(?:\[[^\]]+\]\s*)?(.*?)(?:\s*-\s*|$)/i
  const titleRegex = /-\s*(.*)/i

  const authorMatch = input.match(authorRegex)
  const titleMatch = input.match(titleRegex)

  const title = authorMatch ? authorMatch[1].trim() : ''
  const author = titleMatch ? titleMatch[1].trim() : ''

  return { author: author || 'Unknow', title }
}
