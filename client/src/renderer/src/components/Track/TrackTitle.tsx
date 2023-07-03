type TrackTitleProps = {
  theTrackThatIsPlaying: boolean
  title: string
  author: string
}

export default function TrackTitle({ theTrackThatIsPlaying, title, author }: TrackTitleProps) {
  return (
    <div
      className={`w-[70%] font-medium ${
        theTrackThatIsPlaying ? 'text-white candle-2' : 'text-woodsmoke-300'
      }`}
    >
      <h1 className={`text-[15px] truncate ${theTrackThatIsPlaying && 'font-semibold'}`}>
        {title}
      </h1>
      <span className="text-[11px] text-zinc-400">{author}</span>
    </div>
  )
}
