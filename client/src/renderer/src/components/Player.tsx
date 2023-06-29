import { useAtom } from 'jotai/react'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { useRef, memo, useEffect } from 'react'
import { formatTime } from '@renderer/utils/formatTime'
import Slider from './Lib/Sliders/Slider'
import SwitchIcon from './Icons/SwitchIcon'
import { parseSong } from '@renderer/utils/parseSong'
import { BsPause, BsPlayFill, BsSkipStartFill, BsSoundwave, BsStar } from 'react-icons/bs'
import { TbSwitch3 } from 'react-icons/tb'
import WaveForm from 'wavesurfer.js'

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

  function handleAdjustAudioCurrentTime(e) {
    const input = e.target as HTMLInputElement
    const currentSliderTime = Number(input.value)

    if (audioRef.current) {
      audioRef.current.currentTime = currentSliderTime
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
      <div className="w-[22.15%] h-[100%] flex flex-col justify-center items-center gap-y-3 border-2">
        <h1 className="w-full font-semibold truncate">
          {track && track.metadata && parseSong(track?.metadata?.title)?.title}
        </h1>
        <span className="w-full text-sm text-zinc-400 truncate">
          {track && track.metadata && parseSong(track?.metadata?.title)?.author}
        </span>
      </div>
      <div className="w-fit border-2 flex items-center gap-x-1 justify-center ml-3">
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

        {/* <SwitchIcon
          conditional={!track?.isLooping}
          icon1={<BsRepeat className="svg-shadow" size={20} />}
          icon2={<BsRepeat1 className="svg-shadow" size={20} />}
          onClick={handleAudioLoop}
        /> */}
      </div>
      <div className="w-[400px]">
        <div className="w-full h-full flex flex-col items-center justify-center borer-2">
          <div id="sliderContainer" className="w-full h-full border-2"></div>
          {/* <div className="w-[80%] h-[3px]">
            {track?.currentTime && track.duration && (
              <Slider
                progress={{
                  bgColor: 'bg-gradient-to-r from-rose-500 to-emerald-400',
                  current: track?.currentTime,
                  total: track?.duration
                }}
              />
            )}
          </div>
          <input
            id="timeAdjustmentSlider"
            className="w-[80%] h-[4px] relative z-10 cursor-grabbing"
            ref={timeAdjustmentSliderRef}
            type="range"
            min="0"
            max={track?.duration}
            step="0.1"
            onChange={handleAdjustAudioCurrentTime}
          />
          <div className="w-[80%] flex justify-between">
            <span className="text-[11px] font-semibold">
              {track?.currentTime && formatTime(track.currentTime)}
            </span>
            <span className="text-[11px] font-semibold text-zinc-500">
              {track?.duration && formatTime(track.duration)}
            </span>
          </div> */}
        </div>
      </div>
      <div className="flex-auto h-full flex justify-center items-center gap-3 border-2">
        {<BsStar />}
        <BsSoundwave />
        <TbSwitch3 />
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
