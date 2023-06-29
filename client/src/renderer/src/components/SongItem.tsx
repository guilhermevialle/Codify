import { Song } from '@renderer/types'
import { useState, useEffect, memo } from 'react'
import { FiPlay } from 'react-icons/fi'
import AudioAnimation from './AudioAnimation'
import { useAtom } from 'jotai'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { baseURL } from '@renderer/services/api'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import useLiked from '@renderer/hooks/useLiked'
import { parseSong } from '@renderer/utils/parseSong'

type Props = {
  song: Song | undefined
  index: number
  atClick: (id: number) => void
}

function SongItem({ song, atClick }: Props) {
  if (!song) return null

  const { addLikedItem, removeLikedItem, isLiked } = useLiked()
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

  function handleLikeSong() {
    if (song) {
      if (isLiked(song.id)) return removeLikedItem(song.id)

      addLikedItem(song.id)
    }
  }

  const parsedSong = parseSong(song.title)
  const { title, author } = parsedSong

  return (
    <div
      className="w-full h-[88px] flex items-center justify-between rounded-sm hover:bg-zinc-600 hover:bg-opacity-20 hover:backdrop-blur-sm hover:drop-shadow-lg transition-all cursor-pointer"
      onClick={() => atClick(song.id)}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="w-[10%] flex justify-center">
        {hovering ? (
          <FiPlay size={19} />
        ) : theTrackThatIsPlaying ? (
          <AudioAnimation />
        ) : (
          <span className="text-[0.8rem]">{song.id + 1 + '.'}</span>
        )}
      </span>
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
        <button onClick={handleLikeSong}>
          {isLiked(song.id) ? (
            <i className="text-red-500">
              <FaHeart size={18} />
            </i>
          ) : (
            <i className="hover:text-red-300">{<FaRegHeart size={18} />}</i>
          )}
        </button>
      </span>
    </div>
  )
}

export default memo(SongItem)
