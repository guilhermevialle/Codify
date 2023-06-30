import { useEffect, useRef, useState, memo } from 'react'
import { MousePosition, Peaks } from '@renderer/types'
import { generatePeaksArray } from '@renderer/utils/generatePeaksArray'
import Peak from './Peak'

const peaksConfig: Peaks = {
  containerWidth: 421,
  peakWidth: 4,
  gapSize: 6,
  range: {
    min: 13,
    max: 40
  }
}

const peaksArray = generatePeaksArray(peaksConfig)

type Props = {
  playerFunctions: { handleAdjustAudioCurrentTime: (value: number) => void }
  time: {
    currentTime: number | undefined
    duration: number | undefined
  }
}

function TrackSlider({ time, playerFunctions }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  function handleMouseDown() {
    setIsDragging(true)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDragging) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      if (x >= 0 && x <= rect.width) {
        setMousePosition({
          x,
          y: event.clientY - rect.top
        })
        if (cursorRef.current && progressRef.current) {
          cursorRef.current.style.left = mousePosition.x + 'px'
          progressRef.current.style.width = mousePosition.x + 'px'
        }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (mainRef.current && duration) {
      const mainWidth = mainRef.current.clientWidth
      const position = (mousePosition.x * duration) / mainWidth
      handleAdjustAudioCurrentTime(position)
    }
  }

  function handleMouseLeave() {
    setIsDragging(false)
  }

  const { handleAdjustAudioCurrentTime } = playerFunctions
  const { currentTime, duration } = time
  const mainRef = useRef<HTMLButtonElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  function changeCursorPosition(currentTime: number, duration: number) {
    if (mainRef.current && cursorRef.current) {
      const mainWidth = mainRef.current.clientWidth
      const position = (currentTime * mainWidth) / duration
      changeProgressBar(position)
      cursorRef.current.style.left = position + 'px'
    }
  }

  function changeProgressBar(width: number) {
    if (progressRef.current && duration && currentTime) {
      progressRef.current.style.width = width + 'px'
    }
  }

  useEffect(() => {
    if (currentTime && duration && !isDragging) {
      changeCursorPosition(currentTime, duration)
    }
  }, [time])

  return (
    <button
      ref={mainRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`w-full h-[100%] gap-x-[6px] flex items-center justify-center relative px-3 cursor-grab focus:cursor-grabbing`}
    >
      <div
        ref={cursorRef}
        className={`absolute w-[5px] h-full bg-transparent z-10 shadow-lg rounded-tr-3xl`}
      ></div>
      <div
        ref={progressRef}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-300 via-violet-500 to-rose-400 rounded-3xl border-r-red-500 border-r-[7px] shadow-lg glow"
      ></div>
      {peaksArray.map((height, index) => {
        return (
          <Peak
            key={index}
            style={{
              height
            }}
          />
        )
      })}
    </button>
  )
}

export default memo(TrackSlider)
