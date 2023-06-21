export function formatTime(time: number): string {
  time = Math.round(time)
  const minutes = Math.floor(time / 60)
  const remainingSeconds = time % 60
  if (minutes === 0) {
    return remainingSeconds.toString()
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}
