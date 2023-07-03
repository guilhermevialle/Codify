import { useEffect, useState } from 'react'
import { BsRepeat, BsRepeat1 } from 'react-icons/bs'
import { TbSwitch3 } from 'react-icons/tb'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { useAtom } from 'jotai'

type TrackLoopProps = {}

export default function TrackLoop({}: TrackLoopProps) {
  const [, setTrack] = useAtom(trackAtom)
  const trackLoopMethods = ['random', 'repeatOne', 'repeatAll']
  const [index, setIndex] = useState<number>(1)
  const currentLoopMethod = trackLoopMethods[index]

  function handleSwitchTrack() {
    if (index === 2) return setIndex(0)
    setIndex((prev) => prev + 1)
  }

  useEffect(() => {
    if (currentLoopMethod == 'repeatOne') {
      setTrack((prev) => {
        return { ...prev, isLooping: true }
      })
    } else if (currentLoopMethod == 'random') {
      setTrack((prev) => {
        return { ...prev, isLooping: false, isRandomized: true }
      })
    } else {
      setTrack((prev) => {
        return { ...prev, isLooping: false, isRandomized: false }
      })
    }
  }, [currentLoopMethod])

  return (
    <button onClick={handleSwitchTrack} className="loop-glow text-pink-500 svg-shadow">
      {currentLoopMethod == 'random' ? (
        <TbSwitch3 size={16} />
      ) : currentLoopMethod == 'repeatOne' ? (
        <BsRepeat1 size={16} />
      ) : (
        <BsRepeat size={16} />
      )}
    </button>
  )
}
