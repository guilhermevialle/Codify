export type Song = {
  id: number
  absolutePath: string
  title: string
  lastModified: string
}

export type Track = {
  metadata?: Song
  isPlaying?: boolean
  duration?: number
  currentTime?: number
  currentVolume?: number
  source?: string
  isEnded?: boolean
  isLooping?: boolean
}
