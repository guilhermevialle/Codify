type Props = {
  progress?: {
    bgColor: string
    current: number
    total: number
  }
}

export default function Slider({ progress }: Props) {
  if (!progress) return null

  const { current, total, bgColor } = progress
  const currentProgressPercent = (current * 100) / total

  return (
    <div className="w-full h-[3px] bg-zinc-600 shadow-md">
      <div
        className={`w-1/2 h-full ${bgColor}`}
        style={{
          width: `${currentProgressPercent}%`
        }}
      ></div>
    </div>
  )
}
