import { trackAtom } from '@renderer/contexts/trackAtom'
import { baseURL } from '@renderer/services/api'
import { Song } from '@renderer/types'
import { parseSong } from '@renderer/utils/parseSong'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Track } from '.'

type TrackProviderProps = {
  index: number
  song: Song
  updateCurrentTrack: (id: number) => void
}

export default function TrackProvider({ index, song, updateCurrentTrack }: TrackProviderProps) {
  if (!song) return null

  const [track, setTrack] = useAtom(trackAtom)
  const [hovering, setHover] = useState<boolean>(false)
  const { title, author } = parseSong(song.title)

  const theTrackThatIsPlaying = !track?.isEnded && track?.source == `${baseURL}/song/${song.id}`

  useEffect(() => {
    if (theTrackThatIsPlaying) {
      setTrack((prev) => {
        return { ...prev, metadata: song }
      })
    }
  }, [track?.source])
  return (
    <Track.Root
      onClick={() => updateCurrentTrack(song.id)}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Track.Index
        hovering={hovering}
        theTrackThatIsPlaying={theTrackThatIsPlaying}
        songId={index}
      />
      <Track.Title author={author} title={title} theTrackThatIsPlaying={theTrackThatIsPlaying} />
      <Track.Like id={index} />
    </Track.Root>
  )
}
