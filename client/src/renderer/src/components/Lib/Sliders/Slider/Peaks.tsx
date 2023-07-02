import { useEffect, useRef, useState } from 'react'
import { Dimensions, PeakConfig } from './types'
import { getElementDimensions, getGradientColor } from './utils'
import Peak from './Peak'

type PeaksProps = {
  config: PeakConfig
  colors: string[]
}

export default function Peaks({ config, colors }: PeaksProps) {
  const { gap, width } = config
  const peaksContainerRef = useRef<HTMLDivElement>(null)
  const [peaksContainerDimensions, setPeaksContainerDimensions] =
    useState<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    const dimensions = getElementDimensions(peaksContainerRef.current)

    if (dimensions) {
      setPeaksContainerDimensions(dimensions)
    }
  }, [])

  const peaksAmount = Math.floor(peaksContainerDimensions.width / (width + gap))

  return (
    <div
      ref={peaksContainerRef}
      className='w-full h-full flex absolute top-0 items-center justify-center'
      style={{
        gap: `0 ${gap}px`,
      }}
    >
      {Array.from({ length: peaksAmount }).map((_, index) => {
        const color = getGradientColor(index, peaksAmount, colors)

        return <Peak key={index} peakConfig={{ ...config, color }} />
      })}
    </div>
  )
}
