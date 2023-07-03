import { useEffect, useRef, useState } from 'react'
import Cursor from './Cursor'
import EmptyProgress from './EmptyProgress'
import Peaks from './Peaks'
import Progress from './Progress'
import { MousePositions, SliderConfig } from './types'

type SliderProps = {
  sliderConfig: SliderConfig
}

export default function Slider({ sliderConfig }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const { bgColor, height, peakConfig, totalValue, value, width, cursor, updateValue } =
    sliderConfig
  const [isMousePressing, setIsMousePressing] = useState<boolean>(false)
  const [mousePositions, setMousePositions] = useState<MousePositions | null>(null)

  function getPercentFromX(value: number, total: number) {
    return (value * 100) / total
  }

  const progressWidth = `${getPercentFromX(value, totalValue)}%`
  const emptyProgressWidth = `${100 - getPercentFromX(value, totalValue)}%`

  function getMousePosition(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    element: HTMLDivElement | null
  ) {
    if (element) {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      setMousePositions({
        x,
        y
      })
    }
  }

  useEffect(() => {
    if (mousePositions && width && isMousePressing) {
      const percentPosition = getPercentFromX(mousePositions?.x, width)

      const newValue = (percentPosition * totalValue) / 100

      console.log(newValue)
      updateValue(newValue)
    }
  }, [mousePositions?.x, isMousePressing])

  return (
    <main
      onMouseDown={() => setIsMousePressing(true)}
      onMouseUp={() => setIsMousePressing(false)}
      onMouseMove={(e) => getMousePosition(e, sliderRef.current)}
      onMouseLeave={() => setIsMousePressing(false)}
      ref={sliderRef}
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
      className="relative overflow-hidden rounded-xl cursor-grab focus:cursor-grabbing"
    >
      <Progress width={progressWidth} />
      <EmptyProgress width={emptyProgressWidth} />
      {cursor && <Cursor xPosition={progressWidth} />}
      <Peaks config={peakConfig} colors={bgColor} />
    </main>
  )
}
