export function separateTitleAndAuthor(filename: string): { author: string; title: string } {
  let author = ''
  let title = ''

  // Remove site name from beginning of filename
  filename = filename.replace(/^\[[^\]]+\]\s*/, '')
  filename = filename.replace(/^[^\s]+\s*-\s*/, '')

  // Split by dash
  const parts = filename.split('-')
  if (parts.length > 1) {
    author = parts[0].trim()
    title = parts.slice(1).join('-').trim()
  } else {
    // Split by underscore
    const parts = filename.split('_')
    if (parts.length > 1) {
      author = parts[0].trim()
      title = parts.slice(1).join('_').trim()
    } else {
      // No clear separation between author and title
      title = filename.trim()
    }
  }

  return { author, title }
}
