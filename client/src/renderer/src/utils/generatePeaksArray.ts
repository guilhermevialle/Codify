import { Peaks } from '@renderer/types'
import { getRandomInt } from './getRandomInt'

export function generatePeaksArray({ containerWidth, peakWidth, gapSize, range }: Peaks) {
  const { min, max } = range
  const totalWidth = peakWidth + gapSize
  const numberOfDivs = Math.floor(containerWidth / totalWidth)
  const peaksArray = Array.from({ length: numberOfDivs }, () => getRandomInt(min, max) + 'px')
  return peaksArray
}
