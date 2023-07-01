import { useAtom } from 'jotai/react'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { useRef, memo } from 'react'
import { formatTime } from '@renderer/utils/formatTime'
import SwitchIcon from './Lib/Icons/SwitchIcon'
import { parseSong } from '@renderer/utils/parseSong'
import { BsPause, BsPlayFill, BsSkipStartFill, BsSoundwave } from 'react-icons/bs'
import TrackSlider from './Track/TrackSlider'
import Liked from './Lib/Icons/Liked'
import TrackLoop from './Lib/Icons/TrackLoop'

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
      <div className="w-[150px] h-[100%] flex flex-col justify-center items-center gap-y-3">
        <h1 className="w-full font-semibold truncate">
          {track && track.metadata && parseSong(track?.metadata?.title)?.title}
        </h1>
        <span className="w-full text-sm text-zinc-400 truncate">
          {track && track.metadata && parseSong(track?.metadata?.title)?.author}
        </span>
      </div>
      <div className="w-fit flex items-center gap-x-3 justify-center px-4">
        <button onClick={goToPreviousSong}>
          <BsSkipStartFill className="svg-shadow hover:text-white" size={26} />
        </button>

        <SwitchIcon
          conditional={track?.isPlaying}
          icon1={<BsPause className="svg-shadow" size={36} />}
          icon2={<BsPlayFill className="svg-shadow" size={36} />}
          onClick={track?.isPlaying ? pauseAudio : playAudio}
        />

        <button className="rotate-180" onClick={goToNextSong}>
          <BsSkipStartFill className="svg-shadow hover:text-white" size={26} />
        </button>
      </div>
      <div className="flex-auto">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full h-[70%]">
            <TrackSlider
              playerFunctions={{
                handleAdjustAudioCurrentTime
              }}
              time={{
                currentTime: track?.currentTime ?? 0,
                duration: track?.duration ?? 0
              }}
            />
          </div>
          <div className="w-full h-[30%] flex justify-between items-end px-2">
            <span className="text-sm font-medium">
              {track?.currentTime && formatTime(track?.currentTime)}
            </span>
            <span className="text-sm font-medium text-zinc-500">
              {track?.duration && formatTime(track?.duration)}
            </span>
          </div>
        </div>
      </div>
      <div className="w-fit h-full flex justify-center items-center gap-x-6 px-4">
        <Liked id={track?.metadata?.id} />
        <div className="relative flex items-center justify-center">
          <BsSoundwave size={19} className="svg-shadow" />
        </div>
        <TrackLoop />
      </div>
    </div>
  )
}

export default memo(Player)
