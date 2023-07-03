import { formatTime } from '@renderer/utils/formatTime'
import Slider from '../Lib/Sliders/Slider/Slider'

type PlayerTimeProps = {
  changeValue: (value: number) => void
  time: {
    current: number | undefined
    duration: number | undefined
  }
}

export default function PlayerTime({ time, changeValue }: PlayerTimeProps) {
  const { current, duration } = time

  return (
    <div className="flex-auto">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full h-[70%] flex items-center">
          <Slider
            sliderConfig={{
              width: 400,
              height: 40,
              bgColor: ['#f0abfc', '#8b5cf0', '#4f46e5', '#f43f5e', '#60a5fa'],
              value: current ?? 0,
              totalValue: duration ?? 100,
              peakConfig: {
                width: 5,
                gap: 7
              },
              cursor: true,
              updateValue: changeValue
            }}
          />
        </div>
        <div className="w-full h-[30%] flex justify-between items-end px-2">
          <span className="text-sm font-medium">{formatTime(current ?? 0)}</span>
          <span className="text-sm font-medium text-zinc-500">{formatTime(duration ?? 0)}</span>
        </div>
      </div>
    </div>
  )
}
