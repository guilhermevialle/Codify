import { useAtom } from 'jotai/react'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { useRef, memo } from 'react'
import { parseSong } from '@renderer/utils/parseSong'
import PlayerTitle from './PlayerTitle'
import PlayerControls from './PlayerControls'
import PlayerLoopControls from './PlayerLoopControls'
import PlayerTime from './PlayerTime'

type Props = {
  goToNextSong: () => void
  goToPreviousSong: () => void
  goToNextRandomSong: () => void
  source: string | undefined
}

function Player({ source, goToNextSong, goToPreviousSong, goToNextRandomSong }: Props) {
  if (!source) return null

  const [track, setTrack] = useAtom(trackAtom)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timeAdjustmentSliderRef = useRef<HTMLInputElement>(null)

  function playAudio() {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  function pauseAudio() {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  function handleAudioLoaded() {
    if (audioRef.current) {
      const duration = audioRef.current.duration
      setTrack((prev) => {
        return { ...prev, duration, source }
      })
    }
  }

  function handleAudioEnded() {
    if (!track?.isLooping) return goToNextSong()

    const isEnded = true
    setTrack((prev) => {
      return { ...prev, isEnded }
    })
  }

  function handleAudioPlaying() {
    if (audioRef.current) {
      const isEnded = false
      const isPlaying = !audioRef.current.paused
      setTrack((prev) => {
        return { ...prev, isPlaying, isEnded }
      })
    }
  }

  function observeAudioVariables() {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime
      setTrack((prev) => {
        return { ...prev, currentTime }
      })

      if (timeAdjustmentSliderRef.current) {
        timeAdjustmentSliderRef.current.value = String(currentTime)
      }
    }
  }

  //@ts-ignore
  function handleAdjustAudioVolume(e) {
    const input = e.target as HTMLInputElement
    const currentVolume = Number(input.value)

    if (audioRef.current) {
      audioRef.current.volume = currentVolume

      setTrack((prev) => {
        return { ...prev, currentVolume }
      })
    }
  }

  function handleAdjustAudioCurrentTime(value: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = value
    }
  }

  //@ts-ignore
  function handleAudioLoop() {
    if (audioRef.current) {
      const isLooping = !track?.isLooping

      setTrack((prev) => {
        return { ...prev, isLooping }
      })
    }
  }

  let metadata
  if (track && track.metadata) {
    const { title, author } = parseSong(track.metadata.title)
    metadata = { title, author }
  }

  return (
    <div className="w-full h-full flex">
      <audio
        ref={audioRef}
        onTimeUpdate={observeAudioVariables}
        onLoadedMetadata={handleAudioLoaded}
        onPlay={handleAudioPlaying}
        onPause={handleAudioPlaying}
        onEnded={handleAudioEnded}
        src={source}
        loop={track?.isLooping}
        autoPlay
      ></audio>
      <PlayerTitle metadata={metadata} />
      <PlayerControls
        controls={{
          goToNextSong,
          goToPreviousSong,
          pauseAudio,
          playAudio
        }}
        isTrackPlaying={track?.isPlaying!}
      />
      <PlayerTime
        changeValue={handleAdjustAudioCurrentTime}
        time={{
          current: track?.currentTime,
          duration: track?.duration
        }}
      />
      <PlayerLoopControls id={track?.metadata?.id} />
    </div>
  )
}

export default memo(Player)
