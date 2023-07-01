import { useState } from 'react'
import { BsRepeat, BsRepeat1 } from 'react-icons/bs'
import { TbSwitch3 } from 'react-icons/tb'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { useAtom } from 'jotai'

type Props = {}

export default function TrackLoop({}: Props) {
  const [track, setTrack] = useAtom(trackAtom)
  const trackLoopMethods = ['randomLoop', 'uniqueTrackLoop', 'allTracksLoop']
  const [index, setIndex] = useState<number>(1)
  const currentLoopMethod = trackLoopMethods[index]

  function handleSwitchTrack() {
    if (index === 2) return setIndex(0)
    setIndex((prev) => prev + 1)
  }

  let icon

  if (currentLoopMethod == 'randomLoop') {
    icon = <TbSwitch3 size={19} className="svg-shadow" />
  } else if (currentLoopMethod == 'uniqueTrackLoop') {
    icon = <BsRepeat1 size={19} className="svg-shadow" />
  } else if (currentLoopMethod == 'allTracksLoop') {
    icon = <BsRepeat size={19} className="svg-shadow" />
  }

  return <button onClick={handleSwitchTrack}>{icon}</button>
}
