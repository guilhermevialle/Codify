import { BsSoundwave } from 'react-icons/bs'
import Liked from '../Lib/Icons/Liked'
import TrackLoop from '../Lib/Icons/TrackLoop'

type PlayerLoopControlsProps = {
  id: number | undefined
}

export default function PlayerLoopControls({ id }: PlayerLoopControlsProps) {
  if (Number.isNaN(id)) return null

  return (
    <div className="w-fit h-full flex justify-center items-center gap-x-6 px-4">
      <Liked id={id} />
      <div className="relative flex items-center justify-center">
        <BsSoundwave size={19} className="svg-shadow" />
      </div>
      <TrackLoop />
    </div>
  )
}
