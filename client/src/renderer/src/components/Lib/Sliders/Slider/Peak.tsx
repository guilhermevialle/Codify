import { useEffect, useMemo, useRef } from 'react'
import { PeakT } from './types'
import { getRandomInt } from './utils'

interface PeakProps extends React.HTMLAttributes<HTMLDivElement> {
  peakConfig: PeakT
}

export default function Peak({ peakConfig, ...rest }: PeakProps) {
  const { width, color } = peakConfig
  const height = useMemo(() => getRandomInt(30, 90), [])

  return (
    <div
      {...rest}
      className="h-full rounded-sm svg-shadow"
      style={{
        width: `${width}px`,
        height: `${height}%`,
        backgroundColor: color,
        boxShadow: `1px 1px 3px ${color}`
      }}
    ></div>
  )
}
