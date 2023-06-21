import { trackAtom } from '@renderer/contexts/trackAtom'
import { useAtom } from 'jotai'

export default function AudioAnimation() {
  const [track] = useAtom(trackAtom)

  const mustbeFrozenAnimation = track && !track?.isPlaying && !track.isEnded

  console.log(mustbeFrozenAnimation)

  return (
    <div className="playing">
      <span
        className={`playing__bar playing__bar1 ${mustbeFrozenAnimation ? 'paused' : ''}`}
      ></span>
      <span
        className={`playing__bar playing__bar2 ${mustbeFrozenAnimation ? 'paused' : ''}`}
      ></span>
      <span
        className={`playing__bar playing__bar3 ${mustbeFrozenAnimation ? 'paused' : ''}`}
      ></span>
    </div>
  )
}
