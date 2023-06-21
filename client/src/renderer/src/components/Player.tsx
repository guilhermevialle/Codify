import { useAtom } from 'jotai/react'
import { trackAtom } from '@renderer/contexts/trackAtom'
import { useRef, useEffect, memo } from 'react'
import { FiPlay, FiPause, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type Props = {
  source: string | undefined
}

function Player({ source }: Props) {
  if (!source) return null

  const [track, setTrack] = useAtom(trackAtom)
  const audioRef = useRef<HTMLAudioElement>(null)

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
    }
  }

  useEffect(() => {
    console.log(track)
  }, [track])

  return (
    <div className="w-full border-[1px] h-full flex">
      <audio
        ref={audioRef}
        onTimeUpdate={() => observeAudioVariables()}
        onLoadedMetadata={handleAudioLoaded}
        onPlay={handleAudioPlaying}
        onPause={handleAudioPlaying}
        onEnded={handleAudioEnded}
        src={source}
        autoPlay
      ></audio>
      <div className="w-[22.15%] h-full border-[1px] flex flex-col justify-center items-center gap-y-3">
        <h1>autor</h1>
        <span>musica nome</span>
      </div>
      <div className="flex-auto border-[1px] flex items-center justify-center">
        <button>
          <FiChevronLeft size={30} />
        </button>
        <div>
          {track?.isPlaying ? (
            <button onClick={pauseAudio}>
              <FiPause size={30} />
            </button>
          ) : (
            <button onClick={playAudio}>
              <FiPlay size={30} />
            </button>
          )}
        </div>
        <button>
          <FiChevronRight size={30} />
        </button>
      </div>
    </div>
  )
}

export default memo(Player)
