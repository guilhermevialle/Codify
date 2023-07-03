import { BsPause, BsPlayFill, BsSkipStartFill } from 'react-icons/bs'
import SwitchIcon from '../Lib/Icons/SwitchIcon'

type PlayerControlsProps = {
  controls: {
    goToPreviousSong: () => void
    goToNextSong: () => void
    pauseAudio: () => void
    playAudio: () => void
  }
  isTrackPlaying: boolean
}

export default function PlayerControls({ controls, isTrackPlaying }: PlayerControlsProps) {
  const { goToPreviousSong, goToNextSong, pauseAudio, playAudio } = controls

  return (
    <div className="w-fit flex items-center gap-x-3 justify-center px-4">
      <button onClick={goToPreviousSong}>
        <BsSkipStartFill className="svg-shadow hover:text-white" size={24} />
      </button>
      <SwitchIcon
        conditional={isTrackPlaying}
        icon1={<BsPause className="svg-shadow" size={36} />}
        icon2={<BsPlayFill className="svg-shadow" size={36} />}
        onClick={isTrackPlaying ? pauseAudio : playAudio}
      />
      <button className="rotate-180" onClick={goToNextSong}>
        <BsSkipStartFill className="svg-shadow hover:text-white" size={24} />
      </button>
    </div>
  )
}
