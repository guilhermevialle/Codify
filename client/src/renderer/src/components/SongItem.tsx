import { Song } from '@renderer/types'
import { useState, useEffect, memo } from 'react'
import { FiPlay } from 'react-icons/fi'
import AudioAnimation from './AudioAnimation'
import { useAtom } from 'jotai'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { baseURL } from '@renderer/services/api'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

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
  const [hoveringHeart, setHoverHeart] = useState<boolean>(false)

  const theTrackThatIsPlaying = !track?.isEnded && track?.source == `${baseURL}/song/${song.id}`

  useEffect(() => {
    if (theTrackThatIsPlaying) {
      setTrack((prev) => {
        return { ...prev, metadata: song }
      })
    }
  }, [track?.source])

  return (
    <>
      <div
        className="w-full h-[88px] flex items-center justify-between rounded-sm hover:bg-woodsmoke-900 hover:bg-opacity-60 transition-all cursor-pointer"
        onClick={() => {
          setClick(true)
          atClick(song.id)
        }}
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
        <div className={`w-[70%] font-semibold ${theTrackThatIsPlaying ? 'text-rose-500' : ''}`}>
          <h1 className="text-lg truncate">{song.title}</h1>
          <span className="text-[12px] font-light">{song.lastModified}</span>
        </div>
        <span className="w-[10%] flex justify-center text-[0.8rem]">
          <button
            className={`hover:text-red-400`}
            onMouseMove={() => setHoverHeart(true)}
            onMouseLeave={() => setHoverHeart(false)}
          >
            {hoveringHeart ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          </button>
        </span>
      </div>
      <div className="w-full h-[1px] bg-woodsmoke-900 bg-opacity-40"></div>
    </>
  )
}

export default memo(SongItem)
