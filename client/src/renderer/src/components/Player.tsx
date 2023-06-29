import { useAtom } from 'jotai/react'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { useRef, memo, useEffect } from 'react'
import { formatTime } from '@renderer/utils/formatTime'
import SwitchIcon from './Icons/SwitchIcon'
import { parseSong } from '@renderer/utils/parseSong'
import { BsPause, BsPlayFill, BsSkipStartFill, BsSoundwave, BsStar } from 'react-icons/bs'
import { TbSwitch3 } from 'react-icons/tb'
import TrackSlider from './TrackSlider'

type Props = {
  goToNextSong: () => void
  goToPreviousSong: () => void
  source: string | undefined
}

function Player({ source, goToNextSong, goToPreviousSong }: Props) {
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

  function handleAudioLoop() {
    console.log(track?.isLooping)

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
        <div className="w-full h-full flex flex-col items-center justify-center borer-2">
          <TrackSlider
            playerFunctions={{
              handleAdjustAudioCurrentTime
            }}
            time={{
              currentTime: track?.currentTime,
              duration: track?.duration
            }}
          />
        </div>
      </div>
      <div className="w-fit h-full flex justify-center items-center gap-x-6 px-4">
        {<BsStar className="svg-shadow" />}
        <BsSoundwave className="svg-shadow" />
        <TbSwitch3 className="svg-shadow" />
        {/* <input
          className="w-[50%] h-[2px]"
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={handleAdjustAudioVolume}
        /> */}
      </div>
    </div>
  )
}

export default memo(Player)
