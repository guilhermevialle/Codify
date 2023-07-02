import { Song } from '@renderer/types'
import { useState, useEffect, memo } from 'react'
import { FiPlay } from 'react-icons/fi'
import AudioAnimation from './Animations/AudioAnimation'
import { useAtom } from 'jotai'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { baseURL } from '@renderer/services/api'
import { parseSong } from '@renderer/utils/parseSong'
import Liked from './Lib/Icons/Liked'

type Props = {
  song: Song | undefined
  index: number
  atClick: (id: number) => void
}

function SongItem({ song, atClick }: Props) {
  if (!song) return null

  const [track, setTrack] = useAtom(trackAtom)
  const [hovering, setHover] = useState<boolean>(false)

  const theTrackThatIsPlaying = !track?.isEnded && track?.source == `${baseURL}/song/${song.id}`

  useEffect(() => {
    if (theTrackThatIsPlaying) {
      setTrack((prev) => {
        return { ...prev, metadata: song }
      })
    }
  }, [track?.source])

  const parsedSong = parseSong(song.title)
  const { title, author } = parsedSong

  return (
    <div
      className="w-full h-[88px] flex items-center justify-between rounded-xl hover:bg-dpurple-950 hover:bg-opacity-20 hover:backdrop-blur-sm hover:drop-shadow-lg transition-all cursor-pointer "
      onClick={() => atClick(song.id)}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`w-[70%] font-medium ${
          theTrackThatIsPlaying ? 'text-white candle-2' : 'text-woodsmoke-300'
        }`}
      >
        <h1 className={`text-[15px] truncate ${theTrackThatIsPlaying && 'font-semibold'}`}>
          {title}
        </h1>
        <span className="text-[11px] text-zinc-400">{author}</span>
      </div>
      <span className="w-[10%] flex justify-center text-[0.8rem]">
        <Liked id={song.id} />
      </span>
    </div>
  )
}

export default memo(SongItem)
