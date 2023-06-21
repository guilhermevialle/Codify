import { Song } from '@renderer/types'
import { useState, useEffect, memo } from 'react'
import { FiPlay } from 'react-icons/fi'
import AudioAnimation from './AudioAnimation'
import { useAtom } from 'jotai'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { baseURL } from '@renderer/services/api'

type Props = {
  song: Song | undefined
  index: number
  atClick: (id: number) => void
}

function SongItem({ song, index, atClick }: Props) {
  if (!song) return null

  const [track, setTrack] = useAtom(trackAtom)
  const [hovering, setHover] = useState<boolean>(false)
  const [click, setClick] = useState<boolean>(false)

  const theTrackThatIsPlaying = !track?.isEnded && track?.source == `${baseURL}/song/${song.id}`

  useEffect(() => {
    if (theTrackThatIsPlaying) {
      setTrack((prev) => {
        return { ...prev, metadata: song }
      })
    }
  }, [track?.source])

  return (
    <div
      className="w-full h-14 flex items-center justify-between rounded-sm hover:bg-neutral-900 transition-all cursor-pointer"
      onClick={() => {
        setClick(true)
        atClick(song.id)
      }}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="w-[10%] flex justify-center">
        {hovering ? (
          <FiPlay size={16} />
        ) : theTrackThatIsPlaying ? (
          <AudioAnimation />
        ) : (
          <span className="text-[0.8rem]">{song.id + 1 + '.'}</span>
        )}
      </span>
      <h1
        className={`w-[65%] truncate font-semibold ${theTrackThatIsPlaying ? 'text-blue-500' : ''}`}
      >
        {song.title}
        <span className="w-[20%] flex justify-center text-[12px]">{song.lastModified}</span>
      </h1>
      <span className="w-[20%] flex justify-center text-[0.8rem]"></span>
    </div>
  )
}

export default memo(SongItem)
