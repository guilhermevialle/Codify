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

export type DropdownOption = {
  text: string
  clickFn: () => void
}

export type MousePosition = {
  x: number
  y: number
}

export type Peaks = {
  containerWidth: number
  peakWidth: number
  gapSize: number
  range: {
    min: number
    max: number
  }
}
