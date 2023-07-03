import { FiPlay } from 'react-icons/fi'
import AudioAnimation from '../Animations/AudioAnimation'

type TrackIndexProps = {
  hovering: boolean
  theTrackThatIsPlaying: boolean
  songId: number
}

export default function TrackIndex({ hovering, theTrackThatIsPlaying, songId }: TrackIndexProps) {
  return (
    <span className="w-[10%] flex justify-center">
      {hovering ? (
        <FiPlay size={19} />
      ) : theTrackThatIsPlaying ? (
        <AudioAnimation />
      ) : (
        <span className="text-[0.8rem]">{songId + 1 + '.'}</span>
      )}
    </span>
  )
}
