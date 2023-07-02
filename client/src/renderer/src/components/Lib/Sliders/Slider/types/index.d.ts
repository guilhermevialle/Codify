export type SliderConfig = {
  width: number
  height: number
  bgColor: string[]
  value: number
  totalValue: number
  peakConfig: {
    width: number
    gap: number
  }
  cursor: boolean
  updateValue: (value: number) => void
}

export type PeakConfig = {
  width: number
  gap: number
  height?: number
}

export type PeakT = {
  width: number
  index?: number
  height?: number
  color?: string
}

export type Dimensions = {
  width: number
  height: number
}

export type MousePositions = {
  x: number
  y: number
}
