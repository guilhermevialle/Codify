type PlayerTitleProps = {
  metadata:
    | {
        title: string
        author: string
      }
    | undefined
}

export default function PlayerTitle({ metadata }: PlayerTitleProps) {
  if (!metadata) return null

  const { author, title } = metadata

  return (
    <div className="w-[150px] h-[100%] flex flex-col justify-center items-center gap-y-3">
      <h1 className="w-full font-semibold truncate">{title}</h1>
      <span className="w-full text-sm text-zinc-400 truncate">{author}</span>
    </div>
  )
}
